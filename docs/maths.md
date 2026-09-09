# Used Mathematics

This document explains the mathematical background of this project. Cause even (or maybe especially) the maths involved should be documented.

## WGS 84 and coordinate linearizaion

Earth's geographical coordinates are usually represented using WGS 84 system, which unlike spherical coordinates also accounts for the ellipsoidal shape of the Earth.
Its parametrization looks like

$$
\mathbf{r} = \begin{pmatrix}
(R(\phi)+h)\cos\phi\cos\lambda \\
(R(\phi)+h)\cos\phi\sin\lambda \\
(R(\phi)(1-e^2)+h)\sin\phi
\end{pmatrix}\,,
$$

$$
R(\phi) = \frac{a}{\sqrt{1-e^2\sin^2\phi}}\,
$$

where $a= 6\ 378\ 137\text{ m}$ is the semi-major axis of the Earth (equatorial radius) and $e\approx0,0818$ is the Earth's excentricity.

To make the calculations easier, we esablish locally linear coordinate system with the $x$ axis pointing in the northern direction, $y$ axis in the eastern direction and $z$ axis pointing upwards.
To linearize the system we pick a point about which we linearize the system - we call it a reference point.
Just taking the linear approximation in this point would leave us with a rotated system tangent to the Earth's surface. 
Luckily, the system has otrhogonal basis in which knowing the vectors' norm is enough to easily construct the coordinate system established earlier, using

$$
\|\mathbf{e}_\phi\| = \left\|\frac{\partial{\mathbf{r}}}{\partial{\phi}}\right\|=\frac{a(1-e^2)}{(1-e^2\sin^2\phi)^{\frac{3}{2}}}+h \,,
$$

$$
\|\mathbf{e}_\lambda\| = \left\|\frac{\partial{\mathbf{r}}}{\partial{\lambda}}\right\| = (R(\phi)+h)\cos\phi \,,
$$

$$
\|\mathbf{e}_h\| = \left\|\frac{\partial{\mathbf{r}}}{\partial{h}}\right\|=1 \,,
$$

as 

$$
\begin{pmatrix}x\\ y\\ z \end{pmatrix} = \begin{pmatrix} \|\mathbf{e}_\phi\| & 0 & 0\\ 0 & \|\mathbf{e}_\lambda\| & 0\\ 0 & 0 & \|\mathbf{e}_h\| \end{pmatrix}  \begin{pmatrix} \phi\\ \lambda\\ h \end{pmatrix}\,.
$$

## Image reconstruction

TODO