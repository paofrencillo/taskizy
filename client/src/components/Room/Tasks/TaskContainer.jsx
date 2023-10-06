import { Card, CardBody } from "@material-tailwind/react";

export default function TaskContainer() {
  return (
    <div className="flex flex-wrap gap-4 w-full h-fit shadow-lg p-6 rounded-xl">
      <Card className="flex-grow h-40">
        <CardBody>Bla bla Bla</CardBody>
      </Card>
      <Card className="flex-grow h-40">
        <CardBody>Bla bla Bla</CardBody>
      </Card>
      <Card className="flex-grow h-40">
        <CardBody>Bla bla Bla</CardBody>
      </Card>
      <Card className="flex-grow h-40">
        <CardBody>Bla bla Bla</CardBody>
      </Card>
    </div>
  );
}
