export interface HttpResponse {
  data: any;
  succeeded: boolean;
  errors: string[] | null;
  message: string | null;
}
