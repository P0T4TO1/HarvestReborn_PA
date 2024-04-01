import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link,
  Divider,
} from "@nextui-org/react";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  buttonText: string;
  buttonLink: string;
  icon: string;
}

export const HomeNegocioCard = ({
  title,
  children,
  buttonText,
  buttonLink,
  icon,
}: Props) => {
  return (
    <>
      <Card className="p-6">
        <CardHeader>
          <span className="material-symbols-outlined text-4xl">{icon}</span>
        </CardHeader>
        <CardBody>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {children}
        </CardBody>
        <Divider />
        <CardFooter>
          <Link href={buttonLink}>
            <Button
              color="secondary"
              endContent={
                <span className="material-symbols-outlined">arrow_forward</span>
              }
            >
              {buttonText}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
