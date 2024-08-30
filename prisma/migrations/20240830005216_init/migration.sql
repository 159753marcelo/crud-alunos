-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "nota_primeiro_semestre" DOUBLE PRECISION NOT NULL,
    "nota_segundo_semestre" DOUBLE PRECISION NOT NULL,
    "nome_professor" TEXT NOT NULL,
    "numero_sala" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);
