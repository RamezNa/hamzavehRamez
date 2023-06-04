//css import
import './ShoopingPage.css'

//import function 
import {Dropdown} from '../../componants/dropDownMenue/Dropdown'
import {Card} from '../../componants/card/card'
import {Footer} from '../../componants/footer/footer'
import { useEffect, useState ,useRef } from 'react'

//import from Firebase
import { db ,storage } from '../../componants/firebasse-config'
import { getDoc ,getDocs, collection  } from 'firebase/firestore'
import { async } from '@firebase/util'
import { ref , listAll ,getDownloadURL } from 'firebase/storage'

//export the component
export function ShoppingPage(){

  const dataFetchedRef = useRef(false);

  //init useState 
  const [totalPrice , setTotalPrice ] = useState(0.0)
  const [isMember , setIsMember] = useState(false)
  const [listOfProduct , setListOfProduct] = useState([])
  const [products , setProducts] = useState([])
  const [productsForSelectionEvent , setProductsForSelectionEvent] = useState([])
  const [eventDate , setEventDate] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({});
  const [listOfImg, setListOfImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //collection reference 
  const eventsCollectionRef = collection(db , "events")
  const productsCollectionRef = collection(db , "products")
  const imgRefrence = ref(storage , "productImages/")

  //function to put the product of selected item 
  const getTheProduct = () => {

    if(eventDate.length > 0){
      let ourProducts = []
      eventDate[selectedEvent['index']]['product'].forEach(function(element){
        products.forEach(function(elem){

          element == elem['id'] ? ourProducts = [...ourProducts , elem] : ''
        })
      })
      setProductsForSelectionEvent(ourProducts)
    }

  }  

  //update the product when the eventDateChange
  useEffect( () => {
    getTheProduct()
  },[selectedEvent])

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

        //get the products from the firebase
        const products = await getDocs(productsCollectionRef)
        const filterProducts = products.docs.map( (doc) => ( {...doc.data() ,id: doc.id} ))
        
        setProducts(filterProducts)
        
        //send to the componant dropDown the Events
        let listOfEvents = filterEvents.map( (obj) => { return{ 'date': obj.date.split('T')[0], 'id': obj.id } }  )
        setSelectedEvent({ 'date' :listOfEvents[0]['date'] , 'id':listOfEvents[0]['id'] ,'index':0})
        setEventDate(filterEvents)

        //get the images from the dataBase
        listAll(imgRefrence).then((response) => {
          response.items.forEach((img) => {
            getDownloadURL(img).then((url) =>{
              setListOfImg( (prev) => [...prev , {'img':url , 'path': img['_location']['path_'] } ] )
            })
          })
        })
        
      }catch(err){
        console.error(err)
      }

    }

    if (dataFetchedRef.current) return
    dataFetchedRef.current = true

    getEventList()
  } ,[])




  //function to add to the list the product that we choise and update the totalPrice
  const addToListOfProduct = (selectProduct , addProduct) => {

    //if the situation is to add 
    if(addProduct){
      setTotalPrice( totalPrice + selectProduct.totalPrice)
      setListOfProduct( (addListOfProduct) => {
        return [...addListOfProduct , selectProduct]
      } )

    }else{//the situation is to unselect the product 
      let index = listOfProduct.findIndex( (element)=> element.idProduct === selectProduct )

      if(index !== -1){//if the id in the listOfProduct then remove it 

        setTotalPrice( totalPrice - listOfProduct[index].totalPrice)
        setListOfProduct( (addListOfProduct) => {
          return addListOfProduct.filter( obj => obj.idProduct !== selectProduct)
        } )

      }
      
    }
    
  }

  const func = ( product ) => {
    for(let i = 0 ; i < listOfImg.length ; i++){
      if ( ( 'productImages/' + product['id'] ) == listOfImg[i]['path'] ){
        return listOfImg[i]['img']
      }
    }
  }


  //Choice The enent
  const selectEvent = (event) =>{
    setSelectedEvent(event)
  }
  
  return<>

  {/* <div className='loadingPage'>
      <img src="./_images/loadingPage.gif" alt="GIF Image" />
  </div> */}

  <Dropdown events={eventDate.map( (obj) => { return{ 'date': obj.date.split('T')[0], 'id': obj.id } }  ) } setSelectedOption={selectEvent} selectedOption={selectedEvent} />
  <div className='ContainerOfCard'>
    {productsForSelectionEvent.map( (product , index)=>(
      <Card id={product['id']} imageUrl={ func(product)  } title={product['name']} price={product['price']} howMuchToIncrease={100}  typeOfProduct='גרם' changeTheList={addToListOfProduct} />
    ) )}
  </div>
  <Footer getPrice={ isMember ? (totalPrice - (totalPrice*.3)) : totalPrice } />

  </>
}