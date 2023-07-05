import { FC } from 'react';
import { LoadingIcon } from "../../shared/components/LoadingIcon"
import { useLabels } from "../hooks/useLabels"

interface LabelPickerProps {
  selectedLabels: string[]
  onChange: ( labelName: string ) => void
}

export const LabelPicker: FC<LabelPickerProps> = ({ onChange, selectedLabels }) => {

  const { labelsQuery } = useLabels()

  const { isLoading, data } = labelsQuery
  const labels = data || []

  if(isLoading) return <LoadingIcon />

  return (
    <div>
      {
        labels.map( label => (
          <span 
              className={`badge rounded-pill m-1 label-picker ${ selectedLabels.includes(label.name) ? 'label-active' : ''}`}
              style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
              key={label.id}
              onClick={ () => onChange(label.name) }
          >
              { label.name }
          </span>

        ))
      }
    </div>
  )
}
