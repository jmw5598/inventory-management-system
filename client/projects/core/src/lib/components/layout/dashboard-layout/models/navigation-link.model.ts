export class NavigationLink {
  constructor(
    public text: string, // Text to display
    public url: string | string[], // The routerLink string or string[]
    public iconClass: string // And a css class for an icon, since we're using font awesome.
  ) {}
}