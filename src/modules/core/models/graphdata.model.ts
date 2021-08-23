export class GraphData {
    title: string;
    image: string;
    data: {
        nodes,
        edges
    }

    constructor(title: string, image: string, data) {
        this.title = title;
        this.image = image;
        this.data = data;
    }
}