export interface IThread {
   id?: number;
   content?: string;
   images?: IThreadImage[];
   author: IAuthor;
   like:Ilike[],
   reply:[]
}

export interface IThreadImage {
   id?: number;
   imageUrl?: string;
}

export interface IAuthor {
   id?: string;
   fullname?: string;
   profile?: IProfile;
}

interface IProfile {
   bio?: string;
   username?: string;
   photoProfile?: string;
   cover?: string;
}

interface Ilike{
   userId :string
   threadId :string
   user :IAuthor;
   thread :IThread
   isLike :boolean
}