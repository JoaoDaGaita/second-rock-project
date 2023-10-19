import { VariantProps, cva } from "class-variance-authority"
import { NavLink, NavLinkProps } from "react-router-dom"

const aStyles = cva([
  "hover:border-b-[3px] hover:border-b-product-green hover:border-t-[3px] hover:border-t-transparent [&.active]:text-product-green active:fill-current flex items-center justify-center w-12 h-12",
])

type AnchorProps = NavLinkProps & VariantProps<typeof aStyles>

export function AnchorButton({ ...props }: AnchorProps) {
  return <NavLink {...props} className={aStyles()} />
}
