import { Button, DialogTitle, Dialog, DialogActions, DialogContent } from '@mui/material';

export function RemoveMeta({ open, onClose, onConfirm, meta }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                Tem certeza de que deseja excluir a meta <strong style={{ fontStyle: 'italic' }}>{meta}</strong>? Esta ação não pode ser desfeita.
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary"
                    sx={{
                        fontSize: 'calc(1rem * 1.375)', // Aumento de 37.5% no tamanho da fonte
                        backgroundColor: '#F44336', // Cor vermelha
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#D32F2F', // Cor vermelha mais escura ao passar o mouse
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="secondary"
                    sx={{
                        fontSize: 'calc(1rem * 1.375)', // Aumento de 37.5% no tamanho da fonte
                        backgroundColor: '#4CAF50', // Cor verde
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#388E3C', // Cor verde mais escura ao passar o mouse
                        },
                    }}
                >
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};