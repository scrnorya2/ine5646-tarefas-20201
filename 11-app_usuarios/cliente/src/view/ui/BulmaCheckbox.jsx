//@flow
import React from 'react'

type Props = {|
  label: string,
  checked: boolean,
  onSelect: string => void,
  onUnselect: string => void
|}

function BulmaCheckbox (props: Props) {

  return (
    <div>
      <label>
        <input type='checkbox'
          value={props.label}
          checked={props.checked}
          onChange={() => props.checked ? props.onUnselect(props.label) : props.onSelect(props.label)}/>
        {props.label}
      </label>
    </div>
  )
}

export default BulmaCheckbox
