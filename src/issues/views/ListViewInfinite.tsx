import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery,  } = useIssuesInfinite({ state, labels: selectedLabels, })
  const issues = issuesQuery.data?.pages.flat() || []

  const onLabelChange = ( labelName: string ) => {
    (selectedLabels.includes(labelName)) 
      ? setSelectedLabels(selectedLabels.filter( label => label !== labelName ))
      : setSelectedLabels([...selectedLabels, labelName]) 
  }

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading 
          ? ( <LoadingIcon /> ) 
          : ( 
            <IssueList 
              issues={issues} 
              state={ state }
              onStateChange={ ( state?: State ) => setState(state) }
            /> 
          )
        }
        <button 
          className='btn btn-outline-primary'
          disabled={ !issuesQuery.hasNextPage }
          onClick={ () => issuesQuery.fetchNextPage() }
        >Load more...</button>
      </div>

      
      <div className="col-4">
        <LabelPicker 
          selectedLabels={selectedLabels}
          onChange={ ( labelName )=> onLabelChange(labelName) }
        />
      </div>
    </div>
  )
}
