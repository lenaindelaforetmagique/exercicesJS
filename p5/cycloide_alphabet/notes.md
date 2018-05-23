# Notes de travail
_X.Morin_
----

## Sources / Inspiration
 * Vidéo El Jj : https://www.youtube.com/watch?v=uazPP0ny3XQ
 * Article Wikipédia : https://fr.wikipedia.org/wiki/S%C3%A9rie_de_Fourier

## Calculs

### Théorie
Une forme est un polygone consitué de points (x, y).
Comme cette forme est fermée, elle est périodique.
On peut donc chercher sa décomposition en série de Fourier.
Chaque point est un complexe que l'on cherche à écrire comme la somme de coordonnées de points de cercle.

Pour une harmonique n, on a :
Hn : x |--> c_n(f)×e^(i×2*π*x/T) + c_-n(f)×e^(-i×2*π*x/T)

avec:
* c_k(f) = 1/T×integrale(f(t)×e^(-i×2kπ×t/T)×dt, -T/2, T/2)
* f(t) : la série de points.

Finalement, on a :
f(t) = Sum(Hn(x), n=-∞, n=+∞)
Hn(x) = c_+n×e^(i×K×x) + c_-n×e^(-i×K×x)
où
c_+n = r×e^(i×θ)
c_-n = r'×e^(i×θ')
K = 2×n×π/T

Donc :
* Il faut déterminer les coefficients complexes pour chaque harmonique.
Chaque coefficient complexe donne un rayon de cercle (son module) et une phase (son argument). La vitesse de rotation de chaque cercle est déterminée par le rang de l'harmonique seule.
* Pour chaque harmonique, on obtient deux cercles de vitesses de rotation opposées.

### Calcul des coefficients complexes de Fourier sur un polygone
Intégration par la méthode des rectangles

c_n(f) = Sum((a_k+i×b_k)×e^(-i×2nπ×k/N), k=0, k=N-1)/N
avec N = nbre de points
