export class NavigationLink {
  constructor(
    public text: string, 
    public url: string | string[],
    public iconClass: string,
    public isSectionHeading?: boolean,
    public subLinks?: NavigationLink[],
    public isExpanded?: boolean,
  ) {}
}