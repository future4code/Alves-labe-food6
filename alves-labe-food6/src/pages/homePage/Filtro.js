import React, {useContext, useState} from 'react'
import { GlobalContext } from '../../components/global/GlobalContext'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


const Filtro = () => {
    const {rest, setFilter} = useContext(GlobalContext)
    const [index, setIndex] = useState('')
    
   
    return (
    <Tabs variant='unstyled'>
    <TabList onChange={(index)=>setIndex(index)}>
        {rest && rest.map((rest)=>{return<Tab _selected={{ color: '#E8222E', bg: 'white' }}>{rest.category}</Tab>})}
      </TabList>
    </Tabs>

  )
}

export default Filtro