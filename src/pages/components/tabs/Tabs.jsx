import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export function Abas({ valor, setValor, labels }) {

    const handleChange = (event, newValue) => {
        setValor(newValue);
    };

    return (
        <Tabs
            value={valor}
            onChange={handleChange}
            aria-label="tabs"
            centered
        >
            {labels.map((label, index) => (
                <Tab
                    sx={{
                        '& .MuiTab-root': {
                            color: 'white', // Cor padrão do texto
                            fontWeight: 'bold'
                        },
                        '& .Mui-selected': {
                            color: 'white', // Cor do texto ao ser selecionado
                        },
                    }}
                    key={index} value={index + 1} label={label} />
            ))}
        </Tabs>
    );
}
