create table usuarios (
	id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
);

create table categorias (
	id serial primary key,
  descricao text
);

create table transacoes (
	id serial primary key,
  descricao text,
  valor integer not null,
  data date default now(),
  categoria_id integer not null references categorias(id),
  usuario_id integer not null references usuarios(id),
  tipo text not null
);

insert into categorias (descricao) values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas')