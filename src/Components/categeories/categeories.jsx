import React from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import axios from 'axios'

import { Link } from 'react-router-dom'
function Categeories() {
    const [allcategories, setallcategories] = React.useState(null)
    const getcategories = async () => {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

        setallcategories(data.data);

    }
    React.useEffect(() => {
        getcategories();

    }, [])


    return (<>
        <header className="container">
            <div className="row">

                {
                    allcategories ? allcategories.map((categ) => {
                        return <div className="col-md-4 col-sm-6" key={categ._id} >
                            <Link to={`/categories/${categ._id}`} className='text-decoration-none text-dark'   >
                                <figure >
                                    <img className='w-100' height={250} src={categ.image} alt="cookies slider image" />
                                </figure>

                            </Link>


                        </div>


                    }) : ''

                }

            </div>
        </header>

    </>

    )
}

export default Categeories
