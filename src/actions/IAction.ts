export default interface IAction<TType extends string, TPayload> {
	type: TType;
	payload: TPayload;
}
