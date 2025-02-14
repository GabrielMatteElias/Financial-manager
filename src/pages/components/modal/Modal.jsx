//mui
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//css
import styles from './Modal.module.css';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
  };

export function ModalBasico({ titulo, style, modal = false, setModal, children }) {

    return (
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{zIndex: 999}}
        >
            <Box sx={style || modalStyle}>
                {titulo &&
                    <header className={styles.modal_cabecalho}>
                        <h1>
                            {titulo}
                        </h1>
                        <CloseIcon className={styles.modal_close} fontSize='large' onClick={() => setModal(false)} />
                    </header>
                }
                {children}
            </Box>
        </Modal>
    );
};