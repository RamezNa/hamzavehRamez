import React from 'react';
import './viewStaticAll.css'


export const ViewStaticAll = ( {data } ) => {
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

            <div className="mainStatic">
                <h2>כללי:</h2>
                <h3> מספר ההזמנות: {} הזמנה </h3>
                <h3> ממוצע קניות: {}₪  </h3>
                <h3> ממוצע המוצריים שלקוח קנה: {} מוצריים  </h3>
                <div className='graph'>
                    
                </div>
            </div>

            <div className="eventStatic">
                <h2>אירועים:</h2>
                <h3> האירוע הכי טוב: {} </h3>
                <div className='graph'>

                </div>
            </div>

        </div>



        <div className="productStatic">
            <h2>מוצריים:</h2>
            <h3> המוצר הכי מבוקש: {} </h3>
        </div>

    </div>


</>

}