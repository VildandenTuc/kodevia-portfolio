// ==================== FOOTER AÑO DINÁMICO ====================
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ==================== MENÚ HAMBURGUESA ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (móvil)
const enlaces = navLinks.querySelectorAll('a');
enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ==================== FORMULARIO DE CONTACTO ====================
const formulario = document.querySelector('.formulario-contacto');
if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir envío por defecto

        // Mostrar feedback visual
        const submitBtn = formulario.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        if (submitBtn) {
            submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;">Enviando... <span style="animation: spin 1s linear infinite; display: inline-block;">⏳</span></span>';
            submitBtn.disabled = true;
        }

        // Enviar formulario usando fetch
        try {
            const formData = new FormData(formulario);

            const response = await fetch(formulario.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Redirigir a página de gracias
                window.location.href = 'gracias.html';
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contacta por email directo.');

            // Restaurar botón
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// CSS para animación de loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==================== LAZY LOADING BACKGROUND IMAGES ====================
const lazyBgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.style.backgroundImage = `url('${el.dataset.bg}')`;
            lazyBgObserver.unobserve(el);
        }
    });
}, { rootMargin: '200px' });

document.querySelectorAll('[data-bg]').forEach(el => lazyBgObserver.observe(el));

// ==================== SLIDESHOW HERO ====================
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function changeSlide() {
    // Remover la clase active de la slide actual
    heroSlides[currentSlide].classList.remove('active');

    // Incrementar el índice (volver a 0 si llegamos al final)
    currentSlide = (currentSlide + 1) % heroSlides.length;

    // Agregar la clase active a la nueva slide
    heroSlides[currentSlide].classList.add('active');
}

// Cambiar de slide cada 5 segundos
setInterval(changeSlide, 5000);

// ==================== TECH GROUPS EXPANDIBLES ====================
const techGroups = document.querySelectorAll('.tech-group');

techGroups.forEach(group => {
    group.addEventListener('click', function(e) {
        // Toggle la clase expanded en la tarjeta clickeada
        this.classList.toggle('expanded');

        // Opcional: cerrar otras tarjetas al abrir una nueva (comportamiento accordion)
        // Descomentar las siguientes líneas si se desea ese comportamiento:
        /*
        techGroups.forEach(otherGroup => {
            if (otherGroup !== this) {
                otherGroup.classList.remove('expanded');
            }
        });
        */
    });
});

// ==================== FAQ ACCORDION ====================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;

        // Toggle clase active en el item actual
        faqItem.classList.toggle('active');

        // Opcional: cerrar otros items al abrir uno nuevo (comportamiento accordion exclusivo)
        // Descomentar si quieres que solo una pregunta esté abierta a la vez:
        /*
        const allFaqItems = document.querySelectorAll('.faq-item');
        allFaqItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        */
    });
});

// ==================== MODALS DE CASOS DE ESTUDIO ====================
const modalButtons = document.querySelectorAll('.btn-ver-caso');
const modals = document.querySelectorAll('.caso-modal');
const modalCloses = document.querySelectorAll('.caso-modal-close');

// Abrir modal al hacer clic en el botón
modalButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        }
    });
});

// Cerrar modal al hacer clic en el botón X
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        const modal = this.closest('.caso-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    });
});

// Cerrar modal al hacer clic fuera del contenido
modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Manejar los CTAs dentro de los modals que redirigen a #contacto
const modalCtaBtns = document.querySelectorAll('.caso-cta-btn');
modalCtaBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Cerrar el modal antes de navegar
        const modal = this.closest('.caso-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ==================== ANIMACIONES AVANZADAS ==================== //

// ==================== INTERSECTION OBSERVER PARA SCROLL REVEAL ====================
const observerOptions = {
  threshold: 0.15, // Trigger cuando 15% del elemento es visible
  rootMargin: '0px 0px -50px 0px' // Pequeño offset desde el bottom
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Limpiar will-change después de la animación para performance
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, 800);

      // Dejar de observar después de animar (solo anima una vez)
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos los elementos con clases de animación
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
revealElements.forEach(el => animateOnScroll.observe(el));

const staggerElements = document.querySelectorAll('.stagger-item');
staggerElements.forEach(el => animateOnScroll.observe(el));

// ==================== READING PROGRESS BAR ====================
const readingProgress = document.getElementById('readingProgress');

function updateReadingProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const progress = (scrollTop / documentHeight) * 100;

  if (readingProgress) {
    readingProgress.style.width = `${progress}%`;
  }
}

// Throttle para mejor performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateReadingProgress();
      ticking = false;
    });
    ticking = true;
  }
});

// ==================== PARALLAX HERO ====================
const heroParallax = document.querySelector('.hero-parallax');

function updateParallax() {
  if (!heroParallax) return;

  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5; // Velocidad del parallax (0.5 = 50% de la velocidad del scroll)

  heroParallax.style.transform = `translate3d(0, ${rate}px, 0)`;
}

// Solo aplicar parallax si no está en mobile (performance)
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ==================== SMOOTH SCROLL PARA NAVEGACIÓN ====================
// Mejorar el smooth scroll nativo con un efecto más suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ignorar si es solo "#" o si ya tiene comportamiento (modals)
    if (href === '#' || this.classList.contains('caso-cta-btn')) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80; // Offset para el header fixed

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== CONTADOR ANIMADO PARA NÚMEROS ====================
function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60 FPS
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Observar elementos con contador
const counterElements = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// ==================== HOVER EFFECTS MEJORADOS ====================
// Agregar clase hover-elevate a elementos que lo necesiten
const elevateElements = document.querySelectorAll('.proyecto-card, .servicio-card, .testimonio-card');
elevateElements.forEach(el => {
  el.classList.add('hover-elevate');
});

// ==================== LAZY LOADING MEJORADO ====================
// Intersection Observer para imágenes lazy loading (fallback si navegador no soporta nativo)
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Si la imagen aún no cargó, forzar carga
        if (!img.complete) {
          img.src = img.src;
        }

        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Remover will-change después de las animaciones
setTimeout(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => {
    if (el.classList.contains('active')) {
      el.style.willChange = 'auto';
    }
  });
}, 3000);

// ==================== ACCESIBILIDAD: PREFERS-REDUCED-MOTION ====================
// Detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Deshabilitar animaciones complejas
  document.body.classList.add('reduced-motion');

  // Activar todos los elementos inmediatamente
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item').forEach(el => {
    el.classList.add('active');
  });

  // Ocultar progress bar
  if (readingProgress) {
    readingProgress.style.display = 'none';
  }
}

// ==================== ANIMACIÓN DE ENTRADA PARA HERO ====================
// Animar el contenido del hero al cargar la página
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
});

// ==================== MICRO-INTERACTIONS ====================
// Agregar efecto ripple a botones
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ver-caso').forEach(button => {
  button.addEventListener('click', function(e) {
    // No agregar ripple si está deshabilitado o tiene reduced motion
    if (this.disabled || prefersReducedMotion.matches) return;

    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// CSS para ripple effect (agregado dinámicamente)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-primary, .btn-secondary, .btn-ver-caso {
    position: relative;
    overflow: hidden;
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ==================== DEBUG MODE (solo en desarrollo) ====================
// Descomentar para ver qué elementos se están animando
/*
console.log('Elementos con reveal:', revealElements.length);
console.log('Elementos con stagger:', staggerElements.length);
console.log('Prefers reduced motion:', prefersReducedMotion.matches);
*/

// ==================== BLOG: SISTEMA DE NAVEGACIÓN Y CONTENIDO ====================

// Base de datos de artículos del blog
const blogArticles = {
  'spring-boot-arquitectura': {
    title: 'Arquitectura de Capas en Spring Boot: Del Caos al Orden',
    date: '15 de Enero, 2025',
    readTime: '8 min lectura',
    category: 'Spring Boot',
    tags: ['Arquitectura', 'Best Practices', 'Clean Code'],
    content: `
      <div class="article-meta">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
          8 min lectura
        </span>
        <span>📅 15 de Enero, 2025</span>
        <span>🏷️ Spring Boot · Arquitectura</span>
      </div>

      <h1>Arquitectura de Capas en Spring Boot: Del Caos al Orden</h1>

      <p>
        Si alguna vez trabajaste en un proyecto Spring Boot donde no sabías si un método debía ir en el
        Controller, Service o Repository, este artículo es para ti. La arquitectura de capas no es solo
        una "buena práctica" abstracta: es la diferencia entre código mantenible y una pesadilla de
        acoplamiento que te hará llorar en 6 meses.
      </p>

      <h2>¿Por Qué Necesitamos Capas?</h2>

      <p>
        Imagina que estás construyendo un sistema de facturación. Sin arquitectura de capas, tu código
        podría verse así:
      </p>

      <pre><code>@RestController
public class FacturaController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/facturas")
    public ResponseEntity<?> crearFactura(@RequestBody Factura factura) {
        // Validación mezclada con lógica de negocio
        if (factura.getTotal() < 0) throw new RuntimeException("Total inválido");

        // Query SQL directo en el controller (¡horror!)
        jdbcTemplate.update("INSERT INTO facturas VALUES (?, ?)",
                           factura.getId(), factura.getTotal());

        // Email hardcodeado en el controller
        sendEmail(factura.getCliente().getEmail());

        return ResponseEntity.ok(factura);
    }
}</code></pre>

      <p>
        Este código funciona, pero tiene múltiples problemas:
      </p>

      <ul>
        <li><strong>No es testeable:</strong> ¿Cómo testeas esto sin una base de datos real?</li>
        <li><strong>Acoplamiento extremo:</strong> El controller sabe de SQL, email, validaciones...</li>
        <li><strong>Imposible de escalar:</strong> ¿Qué pasa si necesitas cambiar de MySQL a PostgreSQL?</li>
        <li><strong>Código duplicado:</strong> Cada endpoint repite la misma lógica</li>
      </ul>

      <h2>Las 4 Capas Esenciales</h2>

      <h3>1. Controller Layer (Capa de Presentación)</h3>

      <p>
        <strong>Responsabilidad única:</strong> Recibir requests HTTP y devolver responses. Punto.
      </p>

      <pre><code>@RestController
@RequestMapping("/api/v1/facturas")
@RequiredArgsConstructor
public class FacturaController {
    private final FacturaService facturaService;

    @PostMapping
    public ResponseEntity<FacturaDTO> crearFactura(
            @Valid @RequestBody CrearFacturaRequest request) {
        FacturaDTO factura = facturaService.crearFactura(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(factura);
    }
}</code></pre>

      <p><strong>Reglas de oro del Controller:</strong></p>
      <ul>
        <li>✅ Validaciones de formato (<code>@Valid</code>, <code>@NotNull</code>)</li>
        <li>✅ Transformar DTOs a entidades (o delegarlo a un mapper)</li>
        <li>✅ Manejar códigos HTTP correctos (201, 404, 400, etc.)</li>
        <li>❌ <strong>NUNCA</strong> lógica de negocio</li>
        <li>❌ <strong>NUNCA</strong> acceso directo a repositorios</li>
        <li>❌ <strong>NUNCA</strong> queries SQL</li>
      </ul>

      <h3>2. Service Layer (Capa de Lógica de Negocio)</h3>

      <p>
        Aquí vive la <strong>inteligencia real</strong> de tu aplicación. Las reglas de negocio,
        validaciones complejas, orquestación de operaciones.
      </p>

      <pre><code>@Service
@RequiredArgsConstructor
@Transactional
public class FacturaService {
    private final FacturaRepository facturaRepository;
    private final ClienteRepository clienteRepository;
    private final EmailService emailService;
    private final FacturaMapper mapper;

    public FacturaDTO crearFactura(CrearFacturaRequest request) {
        // 1. Validaciones de negocio
        Cliente cliente = clienteRepository.findById(request.getClienteId())
            .orElseThrow(() -> new ClienteNoEncontradoException());

        if (cliente.tieneSaldoPendiente()) {
            throw new FacturaNoPermitidaException("Cliente con saldo pendiente");
        }

        // 2. Lógica de negocio
        Factura factura = mapper.toEntity(request);
        factura.calcularTotal(); // Lógica interna de la entidad
        factura.aplicarDescuentos(cliente.getNivelDescuento());

        // 3. Persistencia
        Factura facturaGuardada = facturaRepository.save(factura);

        // 4. Operaciones adicionales
        emailService.enviarFactura(cliente.getEmail(), facturaGuardada);

        return mapper.toDTO(facturaGuardada);
    }
}</code></pre>

      <p><strong>Responsabilidades del Service:</strong></p>
      <ul>
        <li>✅ Validaciones de negocio complejas</li>
        <li>✅ Orquestar múltiples repositorios</li>
        <li>✅ Transacciones (<code>@Transactional</code>)</li>
        <li>✅ Llamar servicios externos (email, pagos, etc.)</li>
        <li>❌ <strong>NUNCA</strong> manejar HttpServletRequest/Response</li>
        <li>❌ <strong>NUNCA</strong> queries SQL directo (usa el Repository)</li>
      </ul>

      <h3>3. Repository Layer (Capa de Persistencia)</h3>

      <p>
        Abstrae completamente el acceso a datos. Si mañana cambias de MySQL a MongoDB, solo cambias
        esta capa.
      </p>

      <pre><code>@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {

    // Query methods (Spring Data genera la query automáticamente)
    List<Factura> findByClienteIdAndFechaCreacionBetween(
            Long clienteId,
            LocalDateTime inicio,
            LocalDateTime fin
    );

    // Query personalizada con JPQL
    @Query("SELECT f FROM Factura f WHERE f.estado = :estado AND f.total > :monto")
    List<Factura> buscarFacturasPorEstadoYMonto(
            @Param("estado") EstadoFactura estado,
            @Param("monto") BigDecimal monto
    );

    // Query nativa SQL (usar solo cuando JPQL no alcanza)
    @Query(value = "SELECT * FROM facturas f WHERE YEAR(f.fecha) = :anio",
           nativeQuery = true)
    List<Factura> buscarPorAnio(@Param("anio") int anio);
}</code></pre>

      <p><strong>Cuándo usar cada tipo de query:</strong></p>
      <ul>
        <li><strong>Query methods:</strong> Queries simples (findBy, countBy, existsBy)</li>
        <li><strong>@Query JPQL:</strong> Queries complejas con joins y subconsultas</li>
        <li><strong>Native SQL:</strong> Solo cuando necesitas funciones específicas de la BD</li>
      </ul>

      <h3>4. Model/Entity Layer (Capa de Dominio)</h3>

      <p>
        Las entidades representan tu dominio de negocio. <strong>NO son anémicas</strong> (solo getters/setters).
      </p>

      <pre><code>@Entity
@Table(name = "facturas")
@Getter @Setter
@NoArgsConstructor
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "factura", cascade = CascadeType.ALL)
    private List<ItemFactura> items = new ArrayList<>();

    private BigDecimal subtotal;
    private BigDecimal descuento;
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private EstadoFactura estado;

    // LÓGICA DE NEGOCIO EN LA ENTIDAD (Domain-Driven Design)
    public void calcularTotal() {
        this.subtotal = items.stream()
            .map(ItemFactura::calcularSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        this.total = subtotal.subtract(descuento);
    }

    public void aplicarDescuentos(BigDecimal porcentaje) {
        this.descuento = subtotal.multiply(porcentaje)
                                 .divide(BigDecimal.valueOf(100));
        calcularTotal();
    }

    public void marcarComoPagada() {
        if (this.estado != EstadoFactura.PENDIENTE) {
            throw new FacturaYaPagadaException();
        }
        this.estado = EstadoFactura.PAGADA;
    }
}</code></pre>

      <h2>Flujo Completo de una Request</h2>

      <pre><code>📱 Cliente → Controller → Service → Repository → Database
               ↓          ↓         ↓            ↑
           Validación  Lógica   Persistencia   SQL
           de formato  negocio  (JPA/Hibernate)
</code></pre>

      <h2>Errores Comunes a Evitar</h2>

      <blockquote>
        <strong>❌ Service llamando a otro Service directamente</strong><br>
        Si FacturaService llama a ClienteService, y ClienteService llama a PagoService, terminas con
        un grafo de dependencias imposible de mantener. Solución: usa eventos o un orquestador.
      </blockquote>

      <blockquote>
        <strong>❌ Controller con lógica de negocio</strong><br>
        "Pero es solo una validación pequeña..." No. Todo al Service. Siempre.
      </blockquote>

      <blockquote>
        <strong>❌ Repository con lógica de negocio</strong><br>
        El Repository solo accede a datos. No calcules totales ni apliques descuentos aquí.
      </blockquote>

      <h2>Checklist: ¿Tu Arquitectura es Sólida?</h2>

      <ul>
        <li>✅ ¿Puedes testear la lógica de negocio sin levantar Spring?</li>
        <li>✅ ¿Puedes cambiar de base de datos sin tocar Services?</li>
        <li>✅ ¿Puedes cambiar de REST a GraphQL sin tocar Services?</li>
        <li>✅ ¿Tus entidades tienen lógica más allá de getters/setters?</li>
        <li>✅ ¿Usas DTOs para no exponer entidades JPA directamente?</li>
      </ul>

      <h2>Conclusión</h2>

      <p>
        La arquitectura de capas no es burocracia innecesaria. Es la diferencia entre un proyecto que
        escala y uno que colapsa bajo su propio peso. Cada capa tiene una responsabilidad clara, y
        respetarla te ahorra semanas de refactoring futuro.
      </p>

      <p>
        <strong>Próximo artículo:</strong> Cómo estructurar excepciones y manejo de errores global en
        Spring Boot con <code>@ControllerAdvice</code>.
      </p>
    `
  },
  'jpa-hibernate-optimizacion': {
    title: 'JPA y Hibernate: Evitando el Problema N+1 y Otras Trampas',
    date: '10 de Enero, 2025',
    readTime: '12 min lectura',
    category: 'JPA/Hibernate',
    tags: ['Performance', 'Database', 'Optimization'],
    content: `
      <div class="article-meta">
        <span>⏱️ 12 min lectura</span>
        <span>📅 10 de Enero, 2025</span>
        <span>🏷️ JPA · Hibernate · Performance</span>
      </div>

      <h1>JPA y Hibernate: Evitando el Problema N+1 y Otras Trampas</h1>

      <p>
        Hibernate es magia pura... hasta que no lo es. El problema N+1 puede destruir la performance de
        tu aplicación sin que te des cuenta. Te muestro cómo detectarlo, prevenirlo y otras
        optimizaciones críticas.
      </p>

      <h2>El Problema N+1: La Pesadilla de Performance</h2>

      <p>
        Imagina que tienes esta consulta "inocente":
      </p>

      <pre><code>@GetMapping("/clientes")
public List<ClienteDTO> obtenerClientes() {
    List<Cliente> clientes = clienteRepository.findAll();
    return clientes.stream()
        .map(c -> new ClienteDTO(
            c.getNombre(),
            c.getFacturas().size()  // ← 💣 BOOM! Aquí está el problema
        ))
        .collect(Collectors.toList());
}</code></pre>

      <p>
        <strong>¿Cuántas queries crees que genera este código?</strong>
      </p>

      <p>
        Si tienes 100 clientes, Hibernate ejecuta:
      </p>

      <pre><code>1. SELECT * FROM clientes;                    -- 1 query
2. SELECT * FROM facturas WHERE cliente_id = 1;  -- 100 queries más!!!
3. SELECT * FROM facturas WHERE cliente_id = 2;
4. SELECT * FROM facturas WHERE cliente_id = 3;
   ...
   (97 queries más)</code></pre>

      <p>
        <strong>Total: 101 queries</strong> cuando podría ser solo 1. Esto se llama el problema N+1:
      </p>

      <ul>
        <li><strong>1 query inicial:</strong> traer todos los clientes</li>
        <li><strong>N queries adicionales:</strong> una por cada cliente para traer sus facturas</li>
      </ul>

      <h2>Solución 1: FETCH JOIN (La Más Efectiva)</h2>

      <pre><code>@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("SELECT DISTINCT c FROM Cliente c LEFT JOIN FETCH c.facturas")
    List<Cliente> findAllWithFacturas();
}</code></pre>

      <p>
        Ahora Hibernate genera <strong>1 sola query</strong> con un JOIN:
      </p>

      <pre><code>SELECT c.*, f.*
FROM clientes c
LEFT JOIN facturas f ON c.id = f.cliente_id;</code></pre>

      <p><strong>Cuándo usar FETCH JOIN:</strong></p>
      <ul>
        <li>✅ Siempre que necesites cargar relaciones en la misma request</li>
        <li>✅ Para evitar LazyInitializationException</li>
        <li>⚠️ Cuidado con múltiples joins (genera producto cartesiano)</li>
      </ul>

      <h2>Solución 2: @EntityGraph (Más Declarativo)</h2>

      <pre><code>@Entity
@NamedEntityGraph(
    name = "Cliente.conFacturas",
    attributeNodes = @NamedAttributeNode("facturas")
)
public class Cliente { ... }

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @EntityGraph("Cliente.conFacturas")
    List<Cliente> findAll();
}</code></pre>

      <h2>Solución 3: Batch Fetching (Reducir N queries a log(N))</h2>

      <pre><code>@Entity
public class Cliente {
    @OneToMany(mappedBy = "cliente")
    @BatchSize(size = 10)  // ← Carga facturas en lotes de 10
    private List<Factura> facturas;
}</code></pre>

      <p>
        Con 100 clientes, en lugar de 100 queries, Hibernate hace 10 queries con IN:
      </p>

      <pre><code>SELECT * FROM facturas WHERE cliente_id IN (1,2,3,4,5,6,7,8,9,10);
SELECT * FROM facturas WHERE cliente_id IN (11,12,13,14,15,16,17,18,19,20);
...
(10 queries en total)</code></pre>

      <h2>Detectar Problemas N+1 en Desarrollo</h2>

      <h3>Opción 1: Hibernate Statistics</h3>

      <pre><code>spring.jpa.properties.hibernate.generate_statistics=true

# En logs verás:
# Session Metrics {
#   123 nanoseconds spent executing 101 JDBC statements;
#   ...
# }</code></pre>

      <h3>Opción 2: Datasource Proxy</h3>

      <pre><code>// Dependencia Maven
<dependency>
    <groupId>net.ttddyy</groupId>
    <artifactId>datasource-proxy</artifactId>
    <version>1.8</version>
</dependency>

// Configuración
@Bean
public DataSource dataSource(DataSource actualDataSource) {
    return ProxyDataSourceBuilder
        .create(actualDataSource)
        .countQuery()
        .logQueryToSysOut()
        .build();
}</code></pre>

      <h2>Otras Trampas Comunes de JPA</h2>

      <h3>❌ Trampa 1: EAGER Fetching por Defecto</h3>

      <pre><code>// ❌ MAL: Siempre carga todas las facturas
@OneToMany(fetch = FetchType.EAGER)
private List<Factura> facturas;

// ✅ BIEN: Carga solo cuando lo necesitas
@OneToMany(fetch = FetchType.LAZY)
private List<Factura> facturas;</code></pre>

      <h3>❌ Trampa 2: Queries en Loops</h3>

      <pre><code>// ❌ MAL: N queries dentro de un loop
for (Long id : clienteIds) {
    Cliente c = clienteRepository.findById(id).orElseThrow();
    // hacer algo con c
}

// ✅ BIEN: 1 query con IN
List<Cliente> clientes = clienteRepository.findAllById(clienteIds);</code></pre>

      <h3>❌ Trampa 3: Olvidar @Transactional en Servicios</h3>

      <pre><code>// ❌ MAL: Cada operación en su propia transacción
public void procesarPedido(Long pedidoId) {
    Pedido p = pedidoRepository.findById(pedidoId).orElseThrow();
    p.setEstado(PROCESANDO);
    pedidoRepository.save(p);  // Transaction 1

    inventarioService.reducirStock(p.getItems());  // Transaction 2

    p.setEstado(COMPLETADO);
    pedidoRepository.save(p);  // Transaction 3
}

// ✅ BIEN: Todo en la misma transacción
@Transactional
public void procesarPedido(Long pedidoId) {
    Pedido p = pedidoRepository.findById(pedidoId).orElseThrow();
    p.setEstado(PROCESANDO);

    inventarioService.reducirStock(p.getItems());

    p.setEstado(COMPLETADO);
    // No hace falta save(), Hibernate detecta cambios automáticamente
}</code></pre>

      <h2>Performance Tips Avanzados</h2>

      <h3>1. Proyecciones para Queries de Lectura</h3>

      <pre><code>// En lugar de cargar entidades completas:
@Query("SELECT new com.example.ClienteDTO(c.id, c.nombre) FROM Cliente c")
List<ClienteDTO> findAllProjected();</code></pre>

      <h3>2. Read-Only para Consultas</h3>

      <pre><code>@Transactional(readOnly = true)
public List<Cliente> buscarClientes() {
    // Hibernate optimiza sabiendo que no habrá cambios
}</code></pre>

      <h3>3. Cache de Segundo Nivel</h3>

      <pre><code>@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente { ... }</code></pre>

      <h2>Checklist de Optimización JPA</h2>

      <ul>
        <li>✅ ¿Todas las relaciones son LAZY por defecto?</li>
        <li>✅ ¿Usas FETCH JOIN cuando necesitas relaciones?</li>
        <li>✅ ¿Evitas queries dentro de loops?</li>
        <li>✅ ¿Métodos de servicio tienen @Transactional?</li>
        <li>✅ ¿Consultas de solo lectura marcan readOnly=true?</li>
        <li>✅ ¿Tienes logs de queries en desarrollo?</li>
      </ul>

      <p>
        <strong>Próximo artículo:</strong> Implementación de caché con Redis + Spring Cache para
        reducir hits a la base de datos.
      </p>
    `
  },
  'jwt-autenticacion-segura': {
    title: 'JWT en Spring Boot: Implementación Segura desde Cero',
    date: '5 de Enero, 2025',
    readTime: '15 min lectura',
    category: 'Security',
    tags: ['Security', 'Authentication', 'JWT'],
    content: `
      <div class="article-meta">
        <span>⏱️ 15 min lectura</span>
        <span>📅 5 de Enero, 2025</span>
        <span>🏷️ Security · JWT · Spring Boot</span>
      </div>

      <h1>JWT en Spring Boot: Implementación Segura desde Cero</h1>

      <p>
        JWT (JSON Web Tokens) es el estándar de facto para autenticar APIs REST. Te muestro cómo
        implementarlo correctamente en Spring Boot, evitando vulnerabilidades comunes.
      </p>

      <h2>¿Qué es JWT y Por Qué Usarlo?</h2>

      <p>
        JWT es un token autocontenido que lleva información del usuario codificada. A diferencia de
        sesiones tradicionales, JWT es <strong>stateless</strong>: el servidor no guarda estado de
        sesiones.
      </p>

      <p><strong>Ventajas:</strong></p>
      <ul>
        <li>✅ Escalabilidad (no necesitas sesiones compartidas entre servidores)</li>
        <li>✅ Funciona perfecto para microservicios</li>
        <li>✅ Mobile-friendly (no dependes de cookies)</li>
      </ul>

      <p><strong>Desventajas:</strong></p>
      <ul>
        <li>⚠️ No puedes "revocar" un token antes de que expire</li>
        <li>⚠️ Si alguien roba el token, puede usarlo hasta que expire</li>
      </ul>

      <h2>Estructura de un JWT</h2>

      <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>

      <p>Se divide en 3 partes separadas por puntos:</p>

      <pre><code>HEADER.PAYLOAD.SIGNATURE</code></pre>

      <h3>1. Header</h3>
      <pre><code>{
  "alg": "HS256",
  "typ": "JWT"
}</code></pre>

      <h3>2. Payload (Claims)</h3>
      <pre><code>{
  "sub": "1234567890",        // Subject (user ID)
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["USER", "ADMIN"],
  "iat": 1516239022,          // Issued At
  "exp": 1516242622           // Expiration Time
}</code></pre>

      <h3>3. Signature</h3>
      <pre><code>HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)</code></pre>

      <h2>Implementación Paso a Paso</h2>

      <h3>Paso 1: Dependencias Maven</h3>

      <pre><code><dependencies>
    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- JWT Library -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
</dependencies></code></pre>

      <h3>Paso 2: JWT Utility Class</h3>

      <pre><code>@Component
public class JwtTokenProvider {

    @Value("\${jwt.secret}")
    private String jwtSecret;

    @Value("\${jwt.expiration}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }
}</code></pre>

      <h3>Paso 3: Filtro JWT</h3>

      <pre><code>@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = getJwtFromRequest(request);

            if (jwt != null && tokenProvider.validateToken(jwt)) {
                String username = tokenProvider.getUsernameFromToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );

                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}</code></pre>

      <h3>Paso 4: Security Configuration</h3>

      <pre><code>@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}</code></pre>

      <h3>Paso 5: Controller de Autenticación</h3>

      <pre><code>@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}</code></pre>

      <h2>Best Practices de Seguridad</h2>

      <h3>1. Secret Key Fuerte</h3>

      <pre><code># application.properties
jwt.secret=dGhpc0lzQVN1cGVyU2VjdXJlS2V5Rm9ySldUVG9rZW5HZW5lcmF0aW9uV2l0aDUxMkJpdHM=
jwt.expiration=86400000  # 24 horas en milisegundos</code></pre>

      <p><strong>⚠️ NUNCA hardcodees el secret en el código</strong></p>

      <h3>2. Expiración Corta + Refresh Tokens</h3>

      <ul>
        <li>Access Token: 15-30 minutos</li>
        <li>Refresh Token: 7-30 días</li>
      </ul>

      <h3>3. Validar TODOS los Claims</h3>

      <pre><code>public boolean validateToken(String token) {
    try {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();

        // Validar expiración
        if (claims.getExpiration().before(new Date())) {
            return false;
        }

        // Validar issuer (opcional pero recomendado)
        if (!"kodevia-api".equals(claims.getIssuer())) {
            return false;
        }

        return true;
    } catch (Exception e) {
        return false;
    }
}</code></pre>

      <h2>Conclusión</h2>

      <p>
        JWT es poderoso pero requiere cuidado. Implementado correctamente, te da una autenticación
        stateless escalable. Implementado mal, abre puertas a vulnerabilidades graves.
      </p>

      <p>
        <strong>Próximo artículo:</strong> Refresh Tokens, blacklisting, y cómo revocar JWT en
        situaciones críticas.
      </p>
    `
  },
  'rest-api-best-practices': {
    title: 'Diseño de APIs REST: Principios y Convenciones que Debes Seguir',
    date: '28 de Diciembre, 2024',
    readTime: '10 min lectura',
    category: 'REST APIs',
    tags: ['API Design', 'Standards', 'Best Practices'],
    content: `
      <div class="article-meta">
        <span>⏱️ 10 min lectura</span>
        <span>📅 28 de Diciembre, 2024</span>
        <span>🏷️ REST APIs · Design · Standards</span>
      </div>

      <h1>Diseño de APIs REST: Principios y Convenciones que Debes Seguir</h1>

      <p>
        Una API bien diseñada es fácil de usar, predecible y escalable. Una mal diseñada frustra a
        los desarrolladores y genera bugs. Esta guía te muestra cómo crear APIs REST de nivel
        profesional.
      </p>

      <h2>Principio 1: URLs como Recursos, No Acciones</h2>

      <pre><code>❌ MAL
POST /crearUsuario
GET /obtenerUsuario/123
DELETE /eliminarUsuario/123

✅ BIEN
POST   /api/v1/usuarios           # Crear usuario
GET    /api/v1/usuarios/123       # Obtener usuario
PUT    /api/v1/usuarios/123       # Actualizar usuario
DELETE /api/v1/usuarios/123       # Eliminar usuario</code></pre>

      <p><strong>Reglas:</strong></p>
      <ul>
        <li>✅ Usa sustantivos, no verbos (usuarios, no crearUsuario)</li>
        <li>✅ Usa plural consistentemente (/usuarios, no /usuario)</li>
        <li>✅ El verbo HTTP indica la acción (GET, POST, PUT, DELETE)</li>
      </ul>

      <h2>Principio 2: Códigos HTTP Correctos</h2>

      <h3>2xx: Éxito</h3>
      <ul>
        <li><code>200 OK</code>: GET, PUT, PATCH exitosos</li>
        <li><code>201 Created</code>: POST exitoso (recurso creado)</li>
        <li><code>204 No Content</code>: DELETE exitoso (sin body)</li>
      </ul>

      <h3>4xx: Errores del Cliente</h3>
      <ul>
        <li><code>400 Bad Request</code>: Datos inválidos</li>
        <li><code>401 Unauthorized</code>: No autenticado</li>
        <li><code>403 Forbidden</code>: Autenticado pero sin permisos</li>
        <li><code>404 Not Found</code>: Recurso no existe</li>
        <li><code>409 Conflict</code>: Conflicto (email duplicado, etc.)</li>
        <li><code>422 Unprocessable Entity</code>: Validación de negocio falló</li>
      </ul>

      <h3>5xx: Errores del Servidor</h3>
      <ul>
        <li><code>500 Internal Server Error</code>: Error inesperado</li>
        <li><code>503 Service Unavailable</code>: Servicio temporalmente caído</li>
      </ul>

      <h3>Ejemplo de Uso Correcto</h3>

      <pre><code>@PostMapping("/usuarios")
public ResponseEntity<UsuarioDTO> crearUsuario(@Valid @RequestBody UsuarioRequest request) {
    try {
        UsuarioDTO usuario = usuarioService.crear(request);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(usuario.getId())
            .toUri();

        return ResponseEntity
            .created(location)  // 201 Created
            .body(usuario);

    } catch (EmailDuplicadoException e) {
        throw new ConflictException("Email ya registrado");  // 409 Conflict
    }
}</code></pre>

      <h2>Principio 3: Paginación, Filtros y Ordenamiento</h2>

      <pre><code>GET /api/v1/productos?page=0&size=20&sort=precio,desc&categoria=laptops&minPrecio=500</code></pre>

      <h3>Implementación con Spring Data</h3>

      <pre><code>@GetMapping("/productos")
public ResponseEntity<Page<ProductoDTO>> listarProductos(
        @RequestParam(required = false) String categoria,
        @RequestParam(required = false) BigDecimal minPrecio,
        @RequestParam(required = false) BigDecimal maxPrecio,
        Pageable pageable) {

    Page<ProductoDTO> productos = productoService.buscar(
        categoria, minPrecio, maxPrecio, pageable
    );

    return ResponseEntity.ok(productos);
}</code></pre>

      <h3>Response con Metadata de Paginación</h3>

      <pre><code>{
  "content": [
    { "id": 1, "nombre": "Laptop HP", "precio": 1200 },
    { "id": 2, "nombre": "Laptop Dell", "precio": 1500 }
  ],
  "page": {
    "size": 20,
    "number": 0,
    "totalElements": 156,
    "totalPages": 8
  }
}</code></pre>

      <h2>Principio 4: Versionado de API</h2>

      <h3>Opción 1: URL Versioning (Recomendado)</h3>

      <pre><code>GET /api/v1/usuarios
GET /api/v2/usuarios</code></pre>

      <h3>Opción 2: Header Versioning</h3>

      <pre><code>GET /api/usuarios
Headers:
  Accept: application/vnd.kodevia.v2+json</code></pre>

      <h3>Implementación en Spring Boot</h3>

      <pre><code>@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioControllerV1 { ... }

@RestController
@RequestMapping("/api/v2/usuarios")
public class UsuarioControllerV2 { ... }</code></pre>

      <h2>Principio 5: Manejo de Errores Consistente</h2>

      <h3>Estructura Estándar de Error</h3>

      <pre><code>{
  "timestamp": "2025-01-18T14:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Datos de entrada inválidos",
  "path": "/api/v1/usuarios",
  "errors": [
    {
      "field": "email",
      "rejectedValue": "invalido",
      "message": "Email debe ser válido"
    },
    {
      "field": "edad",
      "rejectedValue": "-5",
      "message": "Edad debe ser mayor a 0"
    }
  ]
}</code></pre>

      <h3>@ControllerAdvice para Manejo Global</h3>

      <pre><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex,
            WebRequest request) {

        List<FieldError> fieldErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> new FieldError(
                error.getField(),
                error.getRejectedValue(),
                error.getDefaultMessage()
            ))
            .collect(Collectors.toList());

        ErrorResponse errorResponse = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Validation Failed")
            .message("Datos de entrada inválidos")
            .path(request.getDescription(false))
            .errors(fieldErrors)
            .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex,
            WebRequest request) {

        ErrorResponse errorResponse = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("Not Found")
            .message(ex.getMessage())
            .path(request.getDescription(false))
            .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
}</code></pre>

      <h2>Principio 6: Documentación con Swagger/OpenAPI</h2>

      <pre><code>@RestController
@RequestMapping("/api/v1/usuarios")
@Tag(name = "Usuarios", description = "API de gestión de usuarios")
public class UsuarioController {

    @Operation(
        summary = "Crear nuevo usuario",
        description = "Registra un nuevo usuario en el sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @ApiResponse(responseCode = "409", description = "Email ya registrado")
    })
    @PostMapping
    public ResponseEntity<UsuarioDTO> crear(
            @Valid @RequestBody UsuarioRequest request) {
        // ...
    }
}</code></pre>

      <h2>Checklist de API de Calidad</h2>

      <ul>
        <li>✅ URLs descriptivas con sustantivos en plural</li>
        <li>✅ Códigos HTTP correctos (200, 201, 400, 404, etc.)</li>
        <li>✅ Paginación para listas grandes</li>
        <li>✅ Filtros y ordenamiento flexibles</li>
        <li>✅ Versionado desde el inicio</li>
        <li>✅ Errores con estructura consistente</li>
        <li>✅ Documentación Swagger/OpenAPI</li>
        <li>✅ HATEOAS (opcional, para APIs maduras)</li>
      </ul>

      <h2>Conclusión</h2>

      <p>
        Una API bien diseñada es predecible, fácil de usar y evoluciona sin romper clientes. Sigue
        estas convenciones y tu API será un placer de consumir.
      </p>

      <p>
        <strong>Próximo artículo:</strong> Rate limiting, throttling y protección contra abuso de
        APIs con Spring Boot.
      </p>
    `
  },
  'testing-spring-boot': {
    title: 'Testing en Spring Boot: Unit Tests, Integration Tests y Mocks',
    date: '20 de Diciembre, 2024',
    readTime: '11 min lectura',
    category: 'Testing',
    tags: ['Testing', 'Quality', 'JUnit'],
    content: `
      <div class="article-meta">
        <span>⏱️ 11 min lectura</span>
        <span>📅 20 de Diciembre, 2024</span>
        <span>🏷️ Testing · Quality · JUnit</span>
      </div>

      <h1>Testing en Spring Boot: Unit Tests, Integration Tests y Mocks</h1>

      <p>
        "No tengo tiempo para tests" es la excusa favorita... hasta que un bug en producción te cuesta
        horas de debugging. Esta guía te muestra cómo testear correctamente en Spring Boot.
      </p>

      <h2>Tipos de Tests: Cuándo Usar Cada Uno</h2>

      <h3>Unit Tests (Tests Unitarios)</h3>
      <p><strong>Qué testean:</strong> Lógica de negocio aislada (servicios, clases utilitarias)</p>
      <p><strong>Velocidad:</strong> Muy rápidos (milisegundos)</p>
      <p><strong>Dependencias:</strong> Todo mockeado</p>

      <h3>Integration Tests (Tests de Integración)</h3>
      <p><strong>Qué testean:</strong> Interacción entre capas (Controller → Service → Repository → DB)</p>
      <p><strong>Velocidad:</strong> Lentos (segundos)</p>
      <p><strong>Dependencias:</strong> Base de datos real o en memoria</p>

      <h3>End-to-End Tests</h3>
      <p><strong>Qué testean:</strong> Flujos completos de usuario</p>
      <p><strong>Velocidad:</strong> Muy lentos</p>
      <p><strong>Dependencias:</strong> Aplicación completa corriendo</p>

      <h2>Unit Tests: Testeando Servicios con Mocks</h2>

      <h3>Servicio a Testear</h3>

      <pre><code>@Service
@RequiredArgsConstructor
public class FacturaService {
    private final FacturaRepository facturaRepository;
    private final ClienteRepository clienteRepository;
    private final EmailService emailService;

    public FacturaDTO crearFactura(CrearFacturaRequest request) {
        Cliente cliente = clienteRepository.findById(request.getClienteId())
            .orElseThrow(() -> new ClienteNoEncontradoException());

        if (cliente.tieneSaldoPendiente()) {
            throw new FacturaNoPermitidaException("Cliente con saldo pendiente");
        }

        Factura factura = new Factura();
        factura.setCliente(cliente);
        factura.setTotal(request.getTotal());
        factura.setEstado(EstadoFactura.PENDIENTE);

        Factura facturaGuardada = facturaRepository.save(factura);
        emailService.enviarFactura(cliente.getEmail(), facturaGuardada);

        return mapToDTO(facturaGuardada);
    }
}</code></pre>

      <h3>Test Unitario con Mockito</h3>

      <pre><code>@ExtendWith(MockitoExtension.class)
class FacturaServiceTest {

    @Mock
    private FacturaRepository facturaRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private FacturaService facturaService;

    @Test
    @DisplayName("Debe crear factura cuando cliente no tiene saldo pendiente")
    void debeCrearFacturaCuandoClienteValido() {
        // Given (Arrange)
        Long clienteId = 1L;
        Cliente cliente = new Cliente();
        cliente.setId(clienteId);
        cliente.setEmail("cliente@example.com");
        cliente.setSaldoPendiente(BigDecimal.ZERO);

        CrearFacturaRequest request = new CrearFacturaRequest();
        request.setClienteId(clienteId);
        request.setTotal(BigDecimal.valueOf(1000));

        Factura facturaGuardada = new Factura();
        facturaGuardada.setId(100L);
        facturaGuardada.setTotal(request.getTotal());

        when(clienteRepository.findById(clienteId)).thenReturn(Optional.of(cliente));
        when(facturaRepository.save(any(Factura.class))).thenReturn(facturaGuardada);

        // When (Act)
        FacturaDTO resultado = facturaService.crearFactura(request);

        // Then (Assert)
        assertThat(resultado).isNotNull();
        assertThat(resultado.getId()).isEqualTo(100L);
        assertThat(resultado.getTotal()).isEqualTo(BigDecimal.valueOf(1000));

        verify(facturaRepository).save(any(Factura.class));
        verify(emailService).enviarFactura(eq("cliente@example.com"), any(Factura.class));
    }

    @Test
    @DisplayName("Debe lanzar excepción cuando cliente no existe")
    void debeLanzarExcepcionCuandoClienteNoExiste() {
        // Given
        Long clienteId = 999L;
        CrearFacturaRequest request = new CrearFacturaRequest();
        request.setClienteId(clienteId);

        when(clienteRepository.findById(clienteId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ClienteNoEncontradoException.class, () -> {
            facturaService.crearFactura(request);
        });

        verify(facturaRepository, never()).save(any(Factura.class));
        verify(emailService, never()).enviarFactura(anyString(), any(Factura.class));
    }

    @Test
    @DisplayName("Debe lanzar excepción cuando cliente tiene saldo pendiente")
    void debeLanzarExcepcionCuandoClienteTieneSaldo() {
        // Given
        Long clienteId = 1L;
        Cliente cliente = new Cliente();
        cliente.setId(clienteId);
        cliente.setSaldoPendiente(BigDecimal.valueOf(500));

        CrearFacturaRequest request = new CrearFacturaRequest();
        request.setClienteId(clienteId);

        when(clienteRepository.findById(clienteId)).thenReturn(Optional.of(cliente));

        // When & Then
        assertThrows(FacturaNoPermitidaException.class, () -> {
            facturaService.crearFactura(request);
        });
    }
}</code></pre>

      <h2>Integration Tests: Testeando con Base de Datos</h2>

      <h3>Test de Repository con H2 in-memory</h3>

      <pre><code>@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FacturaRepositoryTest {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @DisplayName("Debe encontrar facturas por cliente y rango de fechas")
    void debeEncontrarFacturasPorClienteYFechas() {
        // Given
        Cliente cliente = new Cliente();
        cliente.setNombre("Juan Pérez");
        entityManager.persist(cliente);

        Factura factura1 = new Factura();
        factura1.setCliente(cliente);
        factura1.setFechaCreacion(LocalDateTime.now().minusDays(5));
        entityManager.persist(factura1);

        Factura factura2 = new Factura();
        factura2.setCliente(cliente);
        factura2.setFechaCreacion(LocalDateTime.now().minusDays(10));
        entityManager.persist(factura2);

        entityManager.flush();

        // When
        LocalDateTime inicio = LocalDateTime.now().minusDays(7);
        LocalDateTime fin = LocalDateTime.now();

        List<Factura> facturas = facturaRepository
            .findByClienteIdAndFechaCreacionBetween(cliente.getId(), inicio, fin);

        // Then
        assertThat(facturas).hasSize(1);
        assertThat(facturas.get(0).getId()).isEqualTo(factura1.getId());
    }
}</code></pre>

      <h2>Integration Tests: Testeando Controllers</h2>

      <pre><code>@WebMvcTest(FacturaController.class)
class FacturaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FacturaService facturaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/facturas debe crear factura y devolver 201")
    void debeCrearFacturaYDevolver201() throws Exception {
        // Given
        CrearFacturaRequest request = new CrearFacturaRequest();
        request.setClienteId(1L);
        request.setTotal(BigDecimal.valueOf(1000));

        FacturaDTO facturaCreada = new FacturaDTO();
        facturaCreada.setId(100L);
        facturaCreada.setTotal(BigDecimal.valueOf(1000));

        when(facturaService.crearFactura(any(CrearFacturaRequest.class)))
            .thenReturn(facturaCreada);

        // When & Then
        mockMvc.perform(post("/api/v1/facturas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andExpect(jsonPath("$.id").value(100))
            .andExpect(jsonPath("$.total").value(1000));

        verify(facturaService).crearFactura(any(CrearFacturaRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/facturas con datos inválidos debe devolver 400")
    void debeDevolver400CuandoDatosInvalidos() throws Exception {
        // Given
        CrearFacturaRequest request = new CrearFacturaRequest();
        // No seteamos clienteId ni total (inválidos)

        // When & Then
        mockMvc.perform(post("/api/v1/facturas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }
}</code></pre>

      <h2>Test Completo de Integración con @SpringBootTest</h2>

      <pre><code>@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class FacturaIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Flujo completo: crear factura, validar en BD, verificar email")
    void flujoCompletoCreacionFactura() throws Exception {
        // Given
        CrearFacturaRequest request = new CrearFacturaRequest();
        request.setClienteId(1L);  // Cliente debe existir en test-data.sql
        request.setTotal(BigDecimal.valueOf(1500));

        // When: Crear factura
        String response = mockMvc.perform(post("/api/v1/facturas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        FacturaDTO facturaCreada = objectMapper.readValue(response, FacturaDTO.class);

        // Then: Verificar que existe en BD
        mockMvc.perform(get("/api/v1/facturas/" + facturaCreada.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.total").value(1500))
            .andExpect(jsonPath("$.estado").value("PENDIENTE"));
    }
}</code></pre>

      <h2>Best Practices de Testing</h2>

      <ul>
        <li>✅ Nombres descriptivos: <code>debeCrearFacturaCuandoClienteValido()</code></li>
        <li>✅ Patrón Given-When-Then (Arrange-Act-Assert)</li>
        <li>✅ Un assert principal por test</li>
        <li>✅ Tests independientes (no dependen del orden)</li>
        <li>✅ Cleanup automático (anotaciones @Sql, @Transactional)</li>
        <li>✅ Cobertura mínima 70-80% (no 100%, es antiproductivo)</li>
      </ul>

      <h2>Herramientas Útiles</h2>

      <h3>AssertJ (assertions fluidas)</h3>
      <pre><code>assertThat(factura.getTotal())
    .isNotNull()
    .isGreaterThan(BigDecimal.ZERO)
    .isLessThanOrEqualTo(BigDecimal.valueOf(10000));</code></pre>

      <h3>Testcontainers (MySQL real en tests)</h3>
      <pre><code>@Container
static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.0");</code></pre>

      <h2>Conclusión</h2>

      <p>
        Tests no son opcionales. Son la red de seguridad que te permite refactorizar sin miedo y
        agregar features sin romper nada. Invierte tiempo en tests y te lo ahorrarás en debugging.
      </p>

      <p>
        <strong>Próximo artículo:</strong> Testcontainers avanzado - testeando con MySQL, Redis y
        Kafka reales en Docker.
      </p>
    `
  }
};

// ========== FUNCIONES DE FILTRADO Y BÚSQUEDA ==========

// Variable global para el filtro activo
let currentFilter = 'all';
let currentArticleId = null;

// Función para filtrar artículos por categoría
function filterBlogByCategory(category) {
  currentFilter = category;
  const cards = document.querySelectorAll('.blog-card');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const noResults = document.getElementById('blogNoResults');
  let visibleCount = 0;

  // Actualizar botones activos
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filtrar tarjetas
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Mostrar mensaje si no hay resultados
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }

  // Actualizar contador del botón "Todos"
  const allButton = document.querySelector('[data-filter="all"]');
  if (allButton) {
    const countSpan = allButton.querySelector('.filter-count');
    if (countSpan) {
      countSpan.textContent = `(${visibleCount})`;
    }
  }
}

// Función para búsqueda en tiempo real
function searchBlogArticles() {
  const searchInput = document.getElementById('blogSearchInput');
  const searchTerm = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('blogNoResults');
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector('.blog-title').textContent.toLowerCase();
    const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
    const tags = card.getAttribute('data-tags').toLowerCase();
    const category = card.getAttribute('data-category').toLowerCase();

    // Verificar si coincide con búsqueda y filtro actual
    const matchesSearch = title.includes(searchTerm) ||
                          excerpt.includes(searchTerm) ||
                          tags.includes(searchTerm) ||
                          category.includes(searchTerm);

    const cardCategory = card.getAttribute('data-category');
    const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Mostrar/ocultar mensaje de no resultados
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}

// ========== FUNCIONES DEL MODAL MEJORADAS ==========

// Función para abrir artículo en modal con nuevas features
function openBlogPost(articleId) {
  const article = blogArticles[articleId];
  if (!article) {
    console.error('Artículo no encontrado:', articleId);
    return;
  }

  currentArticleId = articleId;
  const modal = document.getElementById('blogModal');
  const modalBody = document.getElementById('blogModalBody');
  const modalContent = modal.querySelector('.blog-modal-content');

  // Cargar contenido
  modalBody.innerHTML = article.content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Restaurar dark mode si estaba activo
  const darkModeActive = localStorage.getItem('blogDarkMode') === 'true';
  if (darkModeActive) {
    modalContent.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }

  // Generar Table of Contents
  generateTableOfContents();

  // Inicializar reading progress
  initReadingProgress();

  // Scroll to top
  modalBody.scrollTop = 0;
}

// Función para cerrar modal
function closeBlogPost() {
  const modal = document.getElementById('blogModal');
  const progressBar = document.getElementById('readingProgressBar');

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  progressBar.style.width = '0%';
  currentArticleId = null;

  // Limpiar event listeners de scroll
  const modalContent = modal.querySelector('.blog-modal-content');
  modalContent.removeEventListener('scroll', updateReadingProgress);
}

// ========== READING PROGRESS BAR ==========

function initReadingProgress() {
  const modal = document.getElementById('blogModal');
  const modalContent = modal.querySelector('.blog-modal-content');

  modalContent.addEventListener('scroll', updateReadingProgress);
}

function updateReadingProgress() {
  const modal = document.getElementById('blogModal');
  const modalContent = modal.querySelector('.blog-modal-content');
  const progressBar = document.getElementById('readingProgressBar');

  const scrollTop = modalContent.scrollTop;
  const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = Math.min(progress, 100) + '%';
}

// ========== TABLE OF CONTENTS ==========

function generateTableOfContents() {
  const modalBody = document.getElementById('blogModalBody');
  const toc = document.getElementById('blogTOC');
  const tocNav = document.getElementById('blogTOCNav');

  // Encontrar todos los H2 y H3
  const headings = modalBody.querySelectorAll('h2, h3');

  if (headings.length === 0) {
    toc.style.display = 'none';
    return;
  }

  toc.style.display = 'block';
  tocNav.innerHTML = '';

  headings.forEach((heading, index) => {
    // Agregar ID al heading si no tiene
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.className = heading.tagName === 'H3' ? 'toc-h3' : '';

    link.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Actualizar active link
      tocNav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });

    tocNav.appendChild(link);
  });
}

// ========== DARK MODE ==========

function toggleDarkMode() {
  const modal = document.getElementById('blogModal');
  const modalContent = modal.querySelector('.blog-modal-content');
  const isDark = modalContent.classList.toggle('dark-mode');

  // Guardar preferencia
  localStorage.setItem('blogDarkMode', isDark);

  // Actualizar icono
  updateDarkModeIcon(isDark);
}

function updateDarkModeIcon(isDark) {
  const toggle = document.getElementById('darkModeToggle');
  const sunIcon = toggle.querySelector('.sun-icon');
  const moonIcon = toggle.querySelector('.moon-icon');

  if (isDark) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// ========== SHARE BUTTONS ==========

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href + '#blog');
  const article = blogArticles[currentArticleId];
  const title = encodeURIComponent(article ? article.title : 'Blog Técnico - Kodevia');

  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    '_blank',
    'width=600,height=400'
  );
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href + '#blog');
  const article = blogArticles[currentArticleId];
  const text = encodeURIComponent(article ? article.title + ' - Kodevia' : 'Blog Técnico - Kodevia');

  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    '_blank',
    'width=600,height=400'
  );
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href + '#blog');

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    '_blank',
    'width=600,height=400'
  );
}

function copyArticleLink() {
  const url = window.location.href.split('#')[0] + '#blog';

  navigator.clipboard.writeText(url).then(() => {
    // Mostrar feedback visual
    const btn = event.target.closest('.share-btn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
    btn.style.background = '#4CAF50';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar enlace:', err);
    alert('No se pudo copiar el enlace');
  });
}

// ========== EVENT LISTENERS ==========

// Cerrar modal al hacer click fuera del contenido
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('blogModal');

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeBlogPost();
      }
    });
  }

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeBlogPost();
    }
  });
});
