export type FBResponse = {
  name: string;
};

export type FBStatus = {
  status: string;
};

export interface useFacebookType {
  callback: (d: any) => void;
  onFailure: (data: FBStatus) => void;
  fbAppId: string;
}

export interface FBProps extends useFacebookType {
  render?: (props: { onClick: (e?: any) => void; disabled?: boolean }) => JSX.Element;
}
