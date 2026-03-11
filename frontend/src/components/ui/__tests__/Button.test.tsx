import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renderiza con children', () => {
    render(<Button>Haz clic</Button>);
    expect(screen.getByText('Haz clic')).toBeInTheDocument();
  });

  it('aplica la variante primary por defecto', () => {
    render(<Button>Primario</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-neutral-950');
  });

  it('aplica la variante secondary', () => {
    render(<Button variant="secondary">Secundario</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('aplica la variante danger', () => {
    render(<Button variant="danger">Peligro</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-neutral-950');
  });

  it('aplica la variante submit', () => {
    render(<Button variant="submit">Enviar</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-neutral-900');
  });

  it('maneja eventos de click', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Haz clic</Button>);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('está deshabilitado cuando la prop disabled es true', () => {
    render(<Button disabled>Deshabilitado</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('aplica custom className', () => {
    render(<Button className="custom-class">Personalizado</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('propaga atributos del button', () => {
    render(<Button type="submit">Enviar</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
