import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { useRoom } from '../../Contexts/RoomContext';
import {
    MDBTextArea, MDBBtn, MDBContainer, MDBCol, MDBRow, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader,
    MDBModalTitle, MDBModalBody, MDBModalFooter,
} from 'mdb-react-ui-kit';



function GiveOrder() {
    const { id } = useParams();
    const { order, setOrder } = useRoom();
    const [scrollableModal, setScrollableModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

    }, [order])

    const submitOrder = () => {
        setScrollableModal(!setScrollableModal)
        const textArea = document.getElementById('textAreaExample');
        const modalContent = document.getElementById('modal-content');
        setOrder((prev) => ([...prev, { roomID: id, order: textArea.value }]));
        localStorage.setItem('order', { roomID: id, order: textArea.value });
        textArea.value = ``;
        modalContent.innerHTML = "";
        // navigate("/");
    }

    const sendOrderToModal = () => {
        setScrollableModal(!scrollableModal);
        const textArea = document.getElementById('textAreaExample');
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `${textArea.value}`;

    }

    const handleChange = () => {
        window.location.reload(true)
    };

    // LocalStorage'da değişiklik olduğunda sayfayı yenile
    useEffect(() => {
        window.addEventListener(
            'storage',
            handleChange,
            false,
        );

        return () => window.removeEventListener('storage', handleChange);
    });

    return (
        <div id='give-order'>
            {/* Header */}
            <div className='p-5 text-center bg-success text-white mb-5'>
                <div className="d-flex justify-content-start mb-3"><h2 className='text-left'>Toplantı Odası {id}</h2></div>
                <h3 className='mb-3'>Siparişlerinizi aşağıda yer alan forma girerek iletebilirsiniz.</h3>
                <h6 className='mb-3'>(Sipariş listenizi doldurduktan sonra 'Sipariş Ver' butonuna tıklayınız.)</h6>
            </div>

            {/* Sipariş alınan input alanı */}
            <MDBContainer breakpoint="md">
                <MDBRow className='d-flex justify-content-center'>
                    <MDBCol size='md-6'>
                        <MDBTextArea label='Siparişlerinizi Giriniz' id='textAreaExample' rows={4} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className='d-flex justify-content-center'>
                    <MDBCol size='md-3 text-center'>
                        <MDBBtn className='mt-3' id='room-order-button' type="submit" onClick={sendOrderToModal} >Sipariş Ver</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>


            {/* Modal */}
            <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Siparişinizi onaylıyor musunuz?</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={() => setScrollableModal(!scrollableModal)}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <h6>Toplantı odası {id}</h6>
                            <p id='modal-content'>
                            </p>

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                                Hayır
                            </MDBBtn>
                            <MDBBtn id='modal-yes-button' type="submit" onClick={submitOrder}
                            >Evet</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


        </div >
    )
}

export default GiveOrder