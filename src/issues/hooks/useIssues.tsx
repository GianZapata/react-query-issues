import { useQuery } from "@tanstack/react-query"
import { githubApi } from "../../api/githubApi"
import { Issue, State } from "../interfaces"

interface UseIssuesProps {
   state?: State
   labels: string[]
}

const getIssues = async ( labels: string[] = [], state?: State ): Promise<Issue[]> => {

   const params = new URLSearchParams()

   if (state) params.append("state", state)
   if (labels.length > 0 ) params.append("labels", labels.join(","))

   params.append('page', '1')
   params.append('per_page', '5')

   const { data } = await githubApi.get<Issue[]>("/issues", {
      params
   })
   return data
}

export const useIssues = ({ labels, state }: UseIssuesProps) => {

   const issuesQuery = useQuery<Issue[]>(
      ["issues", { state, labels }], 
      () => getIssues( labels,state)
   )

  return { issuesQuery }
}
