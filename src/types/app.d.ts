export interface IThread {
   id?: number;
   content?: string;
   images?: IThreadImage[];
   author: IAuthor;
}

export interface IThreadImage {
   id?: number;
   imageUrl?: string;
}

export interface IAuthor {
   id?: number;
   fullname?: string;
   profile?: IProfile;
}

interface IProfile {
   bio?: string;
   username?: string;
   photoProfile?: string;
   cover?: string;
}
