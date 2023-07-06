import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces"
import { sleep } from "../../helpers"
import { githubApi } from "../../api/githubApi"

interface UseIssuesInfiniteProps {
   state?: State  
   labels: string[]
   page?: number
}

interface QueryProps {
   pageParam?: number
   queryKey: ( string | UseIssuesInfiniteProps)[]
}

const getIssues = async ({ queryKey, pageParam = 1 }: QueryProps): Promise<Issue[]> => {

   const [ , , args ] = queryKey
   const { state, labels } = args as UseIssuesInfiniteProps

   const params = new URLSearchParams()

   if (state) params.append("state", state)
   if (labels.length > 0 ) params.append("labels", labels.join(","))

   params.append('page', pageParam.toString() )
   params.append('per_page', '5')

   const { data } = await githubApi.get<Issue[]>("/issues", {
      params
   })
   return data
}

export const useIssuesInfinite = ({ state, labels }:UseIssuesInfiniteProps) => {

   const issuesQuery= useInfiniteQuery(
      ["issues", 'infinite', { state, labels }],
      data => getIssues( data ), {
         getNextPageParam: ( lastPage, pages ) => {
            if (lastPage.length === 0) return
            return pages.length + 1
         }
      }
   )

   return {
      issuesQuery
   }
}
