#-*- coding:utf-8 -*-
from django.shortcuts import render
import uuid

def uid():
	return uuid.uuid1().hex

class Exercicio:
	def __init__(self, nome, descricao, series, ordem = 0):
		self.nome = nome
		self.descricao = descricao
		self.ordem = ordem
		self.objectType = "exercicio"
		if type(series) == str:
			self.series = " X ".join(series.split(','))
		elif type(series) == list:
			self.series = " X ".join(series)

class Relacao:
	def __init__(self, relactionType, time, description):
		self.relactionType = relactionType
		self.time = time
		self.description = description
		self.objectType = "relacao"

class Dia:
	def __init__(self, nome, detalhes, objects = []):
		self.nome = nome
		self.uid = uid()
		self.detalhes = detalhes
		self.objects = objects

class Treino:
	def __init__(self, nome, detalhes, dias = []):
		self.nome = nome
		self.detalhes = detalhes
		self.dias = dias
		self.uid = uid()

def index(request):
	exercicios_dia_0 = [Exercicio("Supino Reto", "Aqui ficará a descrição do exercício,\
		execução e dicas para melhor rendimento, imagens e gifs seriam bem-vindos.", "10,10,10", ""),
	Relacao('descanso', 30, 'Vai beber água.',)]
	dias = [Dia("Peito/Tríceps", "Treino pesadão pra ficar maromba!!1!", exercicios_dia_0)]
	treino = Treino("Teste", "Teste de treino pra ficar marooombaaa", dias)
	context = {"treino":treino}
	return render(request, 'trainMaker/index.html', context)
