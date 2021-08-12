export class Graph {

    public static option = {
        nodes: {
            shape: "circle",
    
            font: {
                size: 30,
                color: "#ffffff",
                face: 'Montserrat',
                align: "right"
            },
            borderWidth: 6,
            color: {
                background: "#6a87af",
                border: "#48648b",
                highlight: {
                    border: 'rgba(255, 64, 128)',
                    background: '#ffa4c3'
                }
            }
        },
        edges: {
            label: '1',
            width: 7,
            length: 300,
            smooth: false,
            color: {
                //inherit: 'both',
                color: '#48648b',
                highlight: '#ff4081'
            },
            font: {
                size: 20,
                color: "#d0dfeb",
                face: 'Montserrat',
                align: 'top',
                strokeWidth: 0
            }
    
        },
        physics: {
            enabled: false,
        },
        manipulation: { enabled: true },
        interaction:{
            multiselect: true
        }
    };

}
