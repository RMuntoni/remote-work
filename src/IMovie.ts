//Base interface for the movie
export interface IMovie {
    id: number;  //db field
    title: string;  //db field
    description: string;  //db field
    rating: string;  //db field
    genres: string;  //computed db field
    adult: boolean;  //db field
    imagePath: string;  //db field
    imagePathSmall: string; //computed field
    imagePathBig: string;//computed field
}