declare module Express {
  export interface Request {
    user: {
      id: string;
      isASchool: Boolean;
      avatar: string | null;
      person?: {
        name: string;
        id: string;
        role: string;
        schoolId: string;
      };
      school?: {
        id: string;
        name: string;
      };
      isASchool: Boolean;
    };
  }
}

return Express;
