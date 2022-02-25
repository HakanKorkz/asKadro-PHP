import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

export default function RequestEmployee() {

    const [workTypeSelect, setWorkTypeSelect] = useState("")

    // const works = [
    //     {"garson":0},
    //     {"komi":0}
    // ]

 
    function inputChangeWorkType(event) {
        setWorkTypeSelect(event.target.value)
        console.log(workTypeSelect)
    }
    const SelectWorkType = (props) => {
        return (
            <div >
                <Button variant='light'>
                <i className="minus icon" />
                </Button>
                
                <div style={{display:"inline",marginLeft:7,marginRight:7,fontSize:21}}> {props.categories}------{} </div>
                <i className="plus icon" />
            </div>

        )
    }
    return (
        <div style={{ marginTop: 20 }}>
           
          <div className='ui relaxed grid'>
               <div class="three column row">
                   <SelectWorkType categories="işçi" />
                   <SelectWorkType categories="şef" />
                   <SelectWorkType categories="komi" />

               </div>
            </div>
        </div>  
    )
}
{/* <Form.Select
aria-label="İstenilen Mevki"
id="workType"
type="text"
onChange={inputChangeWorkType}
>
<option>İstenilen Mevki</option>
<option value="garson">Garson</option>
<option value="komi">Komi</option>
<option value="temizlikçi">Temizlikçi</option>
<option value="bulaşıkçı">Bulaşıkçı</option>
<option value="depo elemanı">Depo Elemanı</option>
<option value="şef">Şef</option>
<option value="hostes">Hostes</option>
<option value="nedime">Nedime</option>
<option value="anket elemanı">Anket Elemanı</option>

</Form.Select> */}