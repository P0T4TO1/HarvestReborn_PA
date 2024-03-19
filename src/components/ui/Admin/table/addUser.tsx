import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary" isIconOnly variant="faded">
          <span className="material-symbols-outlined">person_add</span>
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar usuario
                </ModalHeader>
                <ModalBody>
                  <Input label="Email" variant="bordered" />
                  <Input label="Nombre(s)" variant="bordered" />
                  <Input label="Apellidos" variant="bordered" />
                  <Input label="Número telefónico" variant="bordered" />

                  <Input label="Contraseña" type="password" variant="bordered" />
                  <Input
                    label="Confirmar contraseña"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Agregar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
