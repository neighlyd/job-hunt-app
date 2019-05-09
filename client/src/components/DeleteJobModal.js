import React from 'react'
import Modal from 'react-modal'

export const DeleteJobModal = (props) => (
    <Modal
        isOpen={!!props.showModal}
        className='modal'
        closeTimeoutMS={200}
        contentLabel='Delete Job Confirmation'
        onRequestClose={props.handleCloseModal}
        appElement={document.querySelector('#root')}
    >
        <div>
            Click Delete to permanently delete this job.
            <div className='form__button-well'>
            <button className='button__form  button__warning' onClick={props.deleteJob}>Delete</button>
            <button className='button__form' onClick={props.handleCloseModal}>Cancel</button>
            </div>
        </div>
    </Modal>
)

export default DeleteJobModal