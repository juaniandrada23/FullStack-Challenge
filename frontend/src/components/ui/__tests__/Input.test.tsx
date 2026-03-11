import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renderiza con label', () => {
    render(<Input label="Usuario" />);
    expect(screen.getByText('Usuario')).toBeInTheDocument();
  });

  it('renderiza el campo de input', () => {
    render(<Input label="Correo" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('muestra mensaje de error cuando se provee', () => {
    render(<Input label="Correo" error="Correo inválido" />);
    expect(screen.getByText('Correo inválido')).toBeInTheDocument();
  });

  it('aplica estilos de error cuando hay error', () => {
    render(<Input label="Correo" error="Correo inválido" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-400');
  });

  it('aplica estilo normal cuando no hay error', () => {
    render(<Input label="Correo" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-neutral-300');
  });

  it('maneja la entrada del usuario', async () => {
    const user = userEvent.setup();
    render(<Input label="Nombre" />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'Juan Pérez');
    expect(input).toHaveValue('Juan Pérez');
  });

  it('propaga props del input', () => {
    render(<Input label="Correo" type="email" placeholder="Ingresa tu correo" />);
    const input = screen.getByPlaceholderText('Ingresa tu correo');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('puede estar deshabilitado', () => {
    render(<Input label="Nombre" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
