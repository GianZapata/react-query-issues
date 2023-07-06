import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()
  const { issuesQuery, page,  nextPage, prevPage  } = useIssues({ state, labels: selectedLabels, })
  const issues = issuesQuery.data || []

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
        <div className='d-flex mt-2 justify-content-between'>
          <button 
            className='btn btn-outline-primary' 
            onClick={prevPage}
            disabled={ issuesQuery.isFetching }
          >Prev</button>
          <span>{ page }</span>
          <button 
            className='btn btn-outline-primary' 
            onClick={nextPage}
            disabled={ issuesQuery.isFetching }
          >Next</button>
        </div>
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
