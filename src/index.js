const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/alunos', async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
});

app.post('/alunos', async (req, res) => {
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

    try {
        const novoAluno = await prisma.aluno.create({
            data: {
                nome,
                idade,
                nota_primeiro_semestre,
                nota_segundo_semestre,
                nome_professor,
                numero_sala,
            },
        });
        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
});

app.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

    try {
        const alunoAtualizado = await prisma.aluno.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                idade,
                nota_primeiro_semestre,
                nota_segundo_semestre,
                nome_professor,
                numero_sala,
            },
        });
        res.json(alunoAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
});

app.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.aluno.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
