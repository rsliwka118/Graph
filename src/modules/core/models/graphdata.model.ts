export class GraphData {
    id: string;
    title: string;
    image: string;
    data: {
        nodes,
        edges
    }

    constructor(title: string, image: string, data, id: string) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.data = data;
    }
}