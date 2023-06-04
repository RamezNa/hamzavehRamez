import React from 'react';
import './viewStaticEvent.css'


export const ViewStaticEvent = ( {data , selectedEvent} ) => {
    // avarage of payment
    const getTheAveragePay = () => {
        let average = 0
        let numOfReciept = 0
        data.array.forEach(element => {
            average += element['totalPayment']
            numOfReciept += element['numOfRecipt']
        });

        return (average/numOfReciept)
    }

    const getThOrders = () => {
        let order = 0
        data.forEach( (elem) => {
            order += elem['']
        } )
    }

    const getThAveragePerCustomer = () => {

    }

return<>

    <div className="bodyStatic">

        <div className='containerMain'>

            <div className="orders">
                <h2>כללי:</h2>
                <h3> מספר ההזמנות: {  } הזמנה </h3>
                <h3> ממוצע המוצריים שלקוח קנה: {} מוצריים  </h3>
                <h3> ממוצע קניות: {}₪  </h3>

            </div>

            <div className="orders">
                <h2></h2>
                <h3> סכום המכירות: {console.log(data) }₪  </h3>
                <h3> סכום הקנייה הכי גבוה: {console.log(selectedEvent)}₪  </h3>
                <h3> המוצר המוזמן הכי הרבה: {}₪  </h3>
            </div>

        </div>



        <div className="productStatic">
            <h2>מוצריים:</h2>
            {/* list of product and quantity */}
        </div>

    </div>

</>

}