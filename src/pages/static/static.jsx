//css import
import './static.css'

import React, { useEffect, useState ,useRef } from 'react';
import { Dropdown } from '../../componants/dropDownMenue/Dropdown'
import { ViewStaticAll } from '../../componants/static/viewStatic/viewStaticAll'
import { ViewStaticEvent } from '../../componants/static/viewStatic/viewStaticEvent'

//import from Firebase
import { db } from '../../componants/firebasse-config'
import { getDoc ,getDocs, collection  } from 'firebase/firestore'

export const Static = () => {

    const dataFetchedRef = useRef(false);

    // init usestate
    const [events , setEvent] = useState([])
    const [reciepts , setReciepts] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})
    const [statics, setStatics] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    //collection reference 
    const eventsCollectionRef = collection(db , "events")
    const recieptCollectionRef = collection(db , "orders")

    //use effect to sort the objects
    // useEffect( () => { 

    //   // // Convert object into an array of objects
    //   const objArray = Object.values(statics);
    //   console.log('before: ')
    //   console.log(objArray)

    //   objArray.forEach( ( elem ) => {
    //     //sort the product the bigest quantity is the first
    //     elem['products'].sort( (a,b) => b['quantity'] - a['quantity'] )
    //   } )

    //   //sort the events
    //   objArray.sort( ( a , b ) => b['totalPayment'] - a['totalPayment'] )
    //   console.log('after: ')
    //   console.log(objArray)
    //   setStatics(objArray)
    // },[isLoading] )

    //useEffect
    useEffect( () =>{//do the work for the reciept

      reciepts.forEach( (elem , ind) => {

        if( statics[elem['eventDate']] == undefined ){

          let newStatics = statics
          newStatics[elem['eventDate']] = { 'products': JSON.parse(JSON.stringify(elem['products'])) , 'totalPayment':elem['totalPaid'] , 'numOfRecipt':1 , 'numOfProductPerOneCustomer': elem['products'].length , 'location': elem['eventLocation'] }
          setStatics(newStatics)

        }else{

          let newStatics = statics
          //add to totalPayment
          newStatics[elem['eventDate']]['totalPayment'] += elem['totalPaid']  

          //add to reciept
          newStatics[elem['eventDate']]['numOfRecipt'] += 1
 
          //add to num of product
          newStatics[elem['eventDate']]['numOfProductPerOneCustomer'] += elem['products'].length

          //add to the quntaty product 
          elem['products'].forEach( (prod) => { 

            if( newStatics[elem['eventDate']]['products'].some( (obj) => { if (obj['productName'] == prod['productName']) return true  } ) ){

              const index = newStatics[elem['eventDate']]['products'].findIndex( obj =>  obj['productName'] === prod['productName'] )
              newStatics[elem['eventDate']]['products'][index]['quantity'] += prod['quantity']  

            }else{
              newStatics[elem['eventDate']]['products'] = [...newStatics[elem['eventDate']]['products'] , prod]
            }

          } )

          setStatics(newStatics)

        }

        setIsLoading(true)

      } )

    },[reciepts])

    //get the data from the firestore
    useEffect( () => {
    //get from the firbase the relevent data only on the first rendering the page
    const getEventList = async () => {
        
      try{
        //get the events from the firebase
        const events = await getDocs(eventsCollectionRef)
        const filterEvents = events.docs.map( (doc) => ( {...doc.data() ,id: doc.id} ))

        //sort the events
        filterEvents.sort( (a , b) =>  new Date(a['date'].split('T')[0]) - new Date(b['date'].split('T')[0])  )
        
        //send to the componant dropDown the Events
        let listOfEvents = filterEvents.map( (obj) => { return{ 'date': obj.date.split('T')[0], 'id': obj.id } }  )
        setEvent(listOfEvents)
        setSelectedEvent({ 'date' :listOfEvents[0]['date'] , 'id':listOfEvents[0]['id'] ,'index':0})

        //get the products from the firebase
        const reciept = await getDocs(recieptCollectionRef)
        const filterreciepts = reciept.docs.map( (doc) => ( {...doc.data() ,id: doc.id} ))

        setReciepts(filterreciepts)

      }catch(err){
        console.error(err)
      }

    }

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getEventList()
    } ,[])

    //Choice The enent
    const selectEvent = (event) =>{
        setSelectedEvent(event)
      }

    return (
        <>
        <div className='container'>
          <h1> סטטיסטיקה </h1>
          <Dropdown events={events} setSelectedOption={selectEvent} selectedOption={selectedEvent} />
          <div className='choseDate'>
            <p className='dateChose'>חודש</p>
            <p className='space'>/</p>
            <p className='dateChose'>6 חודשים</p>
            <p className='space'>/</p>
            <p className='dateChose'>שנה</p>
          </div>
          {/* <ViewStaticAll data={statics} /> */}
          <ViewStaticEvent data={statics} selectedEvent={selectedEvent} />

        </div>
        </>
    )
}