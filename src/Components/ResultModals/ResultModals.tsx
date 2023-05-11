import './ResultModals.css';
import Modal from 'react-bootstrap/Modal';
import fine from '../../images/fine.gif';
import fire from '../../images/fire.gif';
import winner from '../../images/winner.gif';

type Props = {
    showWin: boolean;
    showLose: boolean;
    setShowWin: React.Dispatch<React.SetStateAction<boolean>>;
    setShowLose: React.Dispatch<React.SetStateAction<boolean>>;
    setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modals(props: Props) {
    const { showWin, showLose, setShowWin, setShowLose, setGameEnded } = props; //define props

    //func to close loser modal
    function closeLose() {
        setShowLose(!showLose);
        setGameEnded(false);
    };

    //func to close winner modal
    function closeWin() {
        setShowWin(!showWin);
        setGameEnded(false);
    };

    //pick a random gif to show the user
    function randomDeathGif() {
        const options = Array(3).fill(fire);
        options.push(fine);
        const chooseOne = options[Math.floor(Math.random() * options.length)];
        return chooseOne;
    };

    return (
        <div className='modals'>
            {/* loser modal */}
            <Modal
                className='custom-position'
                show={showLose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Sorry, You Died!!!</Modal.Title>
                </Modal.Header>
                <button className='modalBtn' onClick={closeLose}>
                    Restart
                </button>
                <img src={randomDeathGif()} alt='' />
            </Modal>
            {/* winner modal */}
            <Modal
                className='custom-position'
                show={showWin}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Congrats, You Win!!!</Modal.Title>
                </Modal.Header>
                <button className='modalBtn' onClick={closeWin}>
                    Restart
                </button>
                <img src={winner} alt='' />
            </Modal>
        </div>
    )
}