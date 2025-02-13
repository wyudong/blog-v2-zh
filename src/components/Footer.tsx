const Footer = () => {
  return (
    <footer className="bg-neutral-50">
      <div className="text-center p-10">
        <h3 className="text-sm">
          {`© ${new Date().getFullYear()} wyudong`}
        </h3>
      </div>
    </footer>
  )
}

export default Footer
