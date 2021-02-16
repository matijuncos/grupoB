import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import professionActions from '../Redux/actions/professionActions'
import Professional from './Professional'


const Profesionales = (props) => {
    console.log(props)

    const id = props.match.params.id

    const [professionals, setProfessionals] = useState([])
    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const res = await props.getOneProfession(id)
        console.log(res)
        setProfessionals(props.profession.response)
    }
    return (
        <>
            <div className="profesionales">
                <h2>Elegí tu profesional favorito</h2>
                {professionals && professionals.map(professionals => {
                    return (
                        <Professional professionals={professionals} />
                    )
                })}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        profession: state.professionR.profession
    }
}
const mapDispatchToProps = {
    getOneProfession: professionActions.getOneProfession
}

export default connect(mapStateToProps, mapDispatchToProps)(Profesionales)