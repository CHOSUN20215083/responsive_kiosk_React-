import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from 'react-bootstrap/Modal';
import './Home.css'
import { useNavigate } from "react-router-dom";
import WebcamCapture from '../functions/WebcamCapture';
import WebcamCapture1 from '../functions/Camera'
import axios from "axios";


function AIOptionModal(props) {
    const navigate = useNavigate();

    const handleClick = (data) => {
        if (data === 0) {
            navigate("/olderorder");
        } else {
            navigate("/usingai");
        }
    }


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="aioption-title">편리한 인공지능 주문을 사용해보시겠어요?</div>
                <div className="aioption-content">
                    <p>인공지능을 사용하면 자체 내장된 인공지능이</p>
                    <p>이용자분과 목소리로 이야기를 하면서</p>
                    <p>주문을 할 수 있습니다.</p>
                </div>
                <div>
                    <Button variant="primary" onClick={() => handleClick(0)}>인공지능과 주문</Button>
                    <Button variant="secondary" onClick={() => handleClick(1)}>일반 선택 주문</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const Home = () => {
    const [modalShow, setModalShow] = useState(false);

    const [showVideo, setShowVideo] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/youngerorder");
    }

    // useEffect(()=>{
        
    //     axios.post('http://localhost:8080/face-capture', 1)
    //     .then(response => {
    //        console.log("response",response)
    //     })
    //     .catch(error => {
    //         console.error('Error uploading image:', error);
    //     });
    // },[])

    return (
        <div className='first-container'>
            <div className='first-picture-row'>
                <WebcamCapture />
              
            </div>
            {/* <nav className='navbar fixed-top bg-body-tertiary'>
                <div className='container-fluid'>
                <a className='navbar-brand'>ABC 카페 키오스크</a>
                <button
                    type='button'
                    className='btn btn-success call-staff'
                    data-bs-toggle='modal'
                    data-bs-target='#callStaff'
                >
                    직원 호출
                </button>
                </div>
            </nav> */}
            <div
                className='modal fade'
                id='callStaff'
                tabIndex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
            >
                <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                        직원 호출
                    </h1>
                    <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                    ></button>
                    </div>
                    <div className='modal-body'>
                    키오스크 사용이 어려우신가요? 직원이 도와드리겠습니다!
                    </div>
                    <div className='modal-footer'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                    >
                        닫기
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-dismiss='modal'
                        data-bs-target='#calledStaff'
                    >
                        직원 호출
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <p
                style={{
                position: 'absolute',
                top: '20%',
                left: '16%',
                fontSize: '80pt'
                }}
            >
                ABC 카페
            </p>
            <div className='first-description'>
                <p>
                    ABC 카페에 오신 여러분을 환영합니다!
                </p>
                <p>
                    ABC 카페의 키오스크는 여러분의 얼굴을 캡쳐 후,
                </p>
                <p>
                    인식된 연령에 맞춰서 맞춤형 인터페이스를 제공합니다
                </p>
                <p>
                    맞춤형 인터페이스를 통해 더 편해진 키오스크의 경험을 제공해드립니다!
                </p>
            </div>
            <img
                src='https://www.iconarchive.com/download/i134299/iconarchive/fat-sugar-food/Drink-Coffee.1024.png'
                style={{
                position: 'absolute',
                scale: 'calc(0.3)',
                left: '40%',
                bottom: '-10%'
                }}
                alt='커피 이미지'
            />
            <div className='first-bottom'>
                <Button className='btn btn-primary' onClick={handleClick}>매장 이용</Button>
                <Button className='btn btn-secondary' onClick={() => setModalShow(true)}>테이크 아웃</Button>
                <Button className='btn btn-primary' onClick={() => setShowVideo(!showVideo)}>안면 인식</Button>
            </div>
            <AIOptionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {showVideo && <WebcamCapture1 />}
        </div >
    );
};

export default Home;