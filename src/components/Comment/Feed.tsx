import { gql, useQuery } from '@apollo/client'
import SinglePost from '@components/Post/SinglePost'
import PostsShimmer from '@components/Shared/Shimmer/PostsShimmer'
import { Card } from '@components/UI/Card'
import { EmptyState } from '@components/UI/EmptyState'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Spinner } from '@components/UI/Spinner'
import AppContext from '@components/utils/AppContext'
import { BCharityPost } from '@generated/bcharitytypes'
import { PaginatedResultInfo } from '@generated/types'
import { CommentFields } from '@gql/CommentFields'
import { CollectionIcon } from '@heroicons/react/outline'
import consoleLog from '@lib/consoleLog'
import { useRouter } from 'next/router'
import React, { FC, useContext, useState } from 'react'
import { useInView } from 'react-cool-inview'

import ReferenceAlert from '../Shared/ReferenceAlert'
import NewComment from './NewComment'

const COMMENT_FEED_QUERY = gql`
  query CommentFeed($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          ...CommentFields
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  ${CommentFields}
`

interface Props {
  post: BCharityPost
  type?: 'comment' | 'group post'
  onlyFollowers?: boolean
  isFollowing?: boolean
}

const Feed: FC<Props> = ({
  post,
  type = 'comment',
  onlyFollowers = false,
  isFollowing = true
}) => {
  const {
    query: { id }
  } = useRouter()
  const { currentUser } = useContext(AppContext)
  const [publications, setPublications] = useState<BCharityPost[]>([])
  const [pageInfo, setPageInfo] = useState<PaginatedResultInfo>()
  const { data, loading, error, fetchMore } = useQuery(COMMENT_FEED_QUERY, {
    variables: {
      request: { commentsOf: id, limit: 10 }
    },
    skip: !id,
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setPageInfo(data?.publications?.pageInfo)
      setPublications(data?.publications?.items)
      consoleLog(
        'Query',
        '#8b5cf6',
        `Fetched first 10 comments of Publication:${id}`
      )
    }
  })

  const { observe } = useInView({
    onEnter: () => {
      fetchMore({
        variables: {
          request: {
            commentsOf: post?.id,
            cursor: pageInfo?.next,
            limit: 10
          }
        }
      }).then(({ data }: any) => {
        setPageInfo(data?.publications?.pageInfo)
        setPublications([...publications, ...data?.publications?.items])
        consoleLog(
          'Query',
          '#8b5cf6',
          `Fetched next 10 comments of Publication:${id} Next:${pageInfo?.next}`
        )
      })
    }
  })

  return (
    <>
      {currentUser &&
        (isFollowing || !onlyFollowers ? (
          <NewComment post={post} type={type} />
        ) : (
          <ReferenceAlert
            handle={post?.profile?.handle}
            isSuperFollow={
              post?.profile?.followModule?.__typename ===
              'FeeFollowModuleSettings'
            }
            action="comment"
          />
        ))}
      {loading && <PostsShimmer />}
      {data?.publications?.items?.length === 0 && (
        <EmptyState
          message={<span>Be the first one to comment!</span>}
          icon={<CollectionIcon className="w-8 h-8 text-brand" />}
        />
      )}
      <ErrorMessage title="Failed to load comment feed" error={error} />
      {!error && !loading && data?.publications?.items?.length !== 0 && (
        <>
          <Card className="divide-y-[1px] dark:divide-gray-700/80">
            {publications?.map((post: BCharityPost, index: number) => (
              <SinglePost key={`${post?.id}_${index}`} post={post} hideType />
            ))}
          </Card>
          {pageInfo?.next && publications.length !== pageInfo?.totalCount && (
            <span ref={observe} className="flex justify-center p-5">
              <Spinner size="sm" />
            </span>
          )}
        </>
      )}
    </>
  )
}

export default Feed
