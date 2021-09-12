import React from 'react'

import PropTypes from "prop-types"

InputSectionHeader.propTypes = {
    children: PropTypes.string
}

export default function InputSectionHeader({children}){
    return(
        <h3
            className="mb-3 mt-5"
        >
            {children}
        </h3>
    )
}