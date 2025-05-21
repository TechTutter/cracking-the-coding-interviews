export class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) { }
}