export type User = {
  userId: string;
  image: string | null;
  email: string;
  username: string;
  totalStudyTime: number;
  totalMonthStudyTime: number;
  totalWeekStudyTime: number;
  activeStudy: number;
  completedStudy: number;
  follower: string[];
  following: string[];
};
