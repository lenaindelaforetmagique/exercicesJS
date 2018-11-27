# -*- coding: utf-8 -*-
"""Effectue un tirage de paires avec contraintes.
"""
from random import shuffle


class Person():
    def __init__(self, name):
        self.name = name
        self.linked = set()
        self.addLink(self)

    def addLink(self, other):
        self.linked.add(other)

    def toString(self):
        t2 = [v.name for v in self.linked]
        s = self.name + " {" + " ; ".join(t2) + "}"
        return s

    def check(self, other):
        return (other not in self.linked)


class Hat():
    def __init__(self):
        self.persons = []
        self.persons2 = []

    def addPerson(self, name):
        # check if already exists
        alreadyExists = False
        for p in self.persons:
            alreadyExists = alreadyExists or (name == p.name)
        if alreadyExists:
            print(name + " already exists...")
        else:
            self.persons.append(Person(name))
            self.persons2 = []

    def addLink(self, i, j):
        self.persons[i].addLink(self.persons[j])
        self.persons2 = []

    def testPerm(self, perm):
        res = True
        for i, p in enumerate(self.persons):
            res = res and p.check(self.persons[perm[i]])
        return res

    def findPerm(self):
        t = [i for i in range(len(self.persons))]
        while not self.testPerm(t):
            shuffle(t)
        self.persons2 = [self.persons[i] for i in t]

    def resultLines(self):
        t = []
        for i in range(len(self.persons2)):
            t.append(self.persons[i].name +
                    " doit faire un cadeau à " +
                     self.persons2[i].name)
        return t
