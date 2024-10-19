import Container from "@/components/Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-md">
          InvoiceGen &copy; {new Date().getFullYear()}
        </p>
        <p className="text-md ">
          Created by Aditi with Love
        </p>
      </Container>
    </footer>
  );
};

export default Footer;